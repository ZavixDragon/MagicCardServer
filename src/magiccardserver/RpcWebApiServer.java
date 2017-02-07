package magiccardserver;

import rpc.IRpcCallHandler;
import rpc.RpcRequest;
import rpc.RpcRequestStatus;
import rpc.RpcResponse;
import rpc.exceptions.RpcException;
import rpc.validation.RpcRequestValidator;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class RpcWebApiServer
{
    private final RpcRequestValidator _validator;
    private final HttpServer _httpServer;
    private final Map<String, IRpcCallHandler> _callHandlers;

    public RpcWebApiServer(final int port)
    {
        _validator = new RpcRequestValidator();
        _validator.setRequiresRequestId(false);
        _httpServer = new HttpServer(port);
        _httpServer.setServeFunction(x -> serve(x));
        _callHandlers = new HashMap<>();
    }

    public void start()
    {
        _httpServer.start();
    }

    public void stop()
    {
        _httpServer.stop();
    }

    public void addCallHandlers(final Map<String, IRpcCallHandler> callHandlers)
    {
        _callHandlers.putAll(callHandlers);
    }

    public void addRpcCallHandler(final IRpcCallHandler callHandler)
    {
        _callHandlers.put(callHandler.getUri(), callHandler);
    }

    private NanoHTTPD.Response serve(NanoHTTPD.IHTTPSession session)
    {
        String uri = session.getUri();
        NanoHTTPD.Method method = session.getMethod();
        Map<String, String> postData = new HashMap<>();
        if (NanoHTTPD.Method.PUT.equals(method) || NanoHTTPD.Method.POST.equals(method))
        {
            try
            {
                session.parseBody(postData);
            }
            catch (IOException ioe)
            {
                return createHttpResponse(NanoHTTPD.Response.Status.INTERNAL_ERROR, "plain/text",
                        "SERVER INTERNAL ERROR: IOException: " + ioe.getMessage());
            }
            catch (NanoHTTPD.ResponseException re)
            {
                return createHttpResponse(re.getStatus(), "plain/text", re.getMessage());
            }
        }

        try
        {
            if (!_callHandlers.containsKey(uri))
                return createHttpResponse(NanoHTTPD.Response.Status.NOT_FOUND, "text/plain", "Unknown RPC URI: " + uri);

            IRpcCallHandler handler = _callHandlers.get(uri);
            RpcResponse response = null;
            if (method.equals(NanoHTTPD.Method.POST))
                response = getResponse(handler, getRequest(handler, postData.get("postData")));
            if (method.equals(NanoHTTPD.Method.GET))
                response = getResponse(handler, getRequestOrDefault(handler, getRequestParamsAsJson(session)));
            if (response != null)
                return createHttpResponse(NanoHTTPD.Response.Status.OK, "application/json", Json.toJsonString(response));
        }
        catch (Exception e)
        {
            return createHttpResponse(NanoHTTPD.Response.Status.OK, "application/json",
                    Json.toJsonString(createErrorResponse(e)));
        }

        return createHttpResponse(NanoHTTPD.Response.Status.BAD_REQUEST, "text/plain", "Bad Request");
    }

    private RpcResponse createErrorResponse(final Exception ex)
    {
        return new RpcResponse("", RpcRequestStatus.Error, ex.getMessage());
    }

    private String getRequestParamsAsJson(NanoHTTPD.IHTTPSession session)
    {
        return toJson(session.getParameters());
    }

    private RpcRequest getRequestOrDefault(final IRpcCallHandler handler, final String requestJson)
    {
        try
        {
            return getRequest(handler, requestJson);
        }
        catch (Exception e)
        {
            if (handler.getRequestType().equals(RpcRequest.class))
                return new RpcRequest();
            else
                _validator.validate(new RpcRequest(null), handler.getRequestType());
        }
        throw new RpcException("Invalid request params: " + requestJson);
    }

    private RpcRequest getRequest(final IRpcCallHandler handler, final String requestJson)
    {
        RpcRequest request = (RpcRequest) Json.toObj(handler.getRequestType(), requestJson);
        _validator.validate(request);
        return request;
    }

    @SuppressWarnings("unchecked")
    private RpcResponse getResponse(final IRpcCallHandler handler, final RpcRequest request)
    {
        try
        {
            return handler.getResponse(request);
        }
        catch (Exception e)
        {
            return new RpcResponse(request.RequestId, RpcRequestStatus.Error, "Exception occurred: " + e.getMessage());
        }
    }

    private String toJson(Map<String, List<String>> parameters)
    {
        if (parameters.size() == 0)
            return "{ }";

        StringBuilder sb = new StringBuilder();
        sb.append("{");
        parameters.entrySet().forEach(x -> sb.append("\"" + x.getKey() + "\":" + "\"" + x.getValue().get(0) + "\","));
        String partialResult = sb.toString();
        return partialResult.substring(0, partialResult.length() - 1) + "}";
    }

    private NanoHTTPD.Response createHttpResponse(final NanoHTTPD.Response.Status httpStatus, String contentType, String body)
    {
        return NanoHTTPD.newFixedLengthResponse(httpStatus, contentType, body);
    }
}

