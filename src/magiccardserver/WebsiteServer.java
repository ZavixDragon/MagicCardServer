package magiccardserver;

public class WebsiteServer {
    private final HttpServer server;

    public WebsiteServer() {
        server = new HttpServer(8080);
        server.setServeFunction(this::serve);
    }

    public void start() {
        server.start();
    }

    private NanoHTTPD.Response serve(NanoHTTPD.IHTTPSession session) {
        String uri = session.getUri();
        NanoHTTPD.Method method = session.getMethod();
        if (method != NanoHTTPD.Method.GET)
            return createHttpResponse(NanoHTTPD.Response.Status.NOT_FOUND, "text/html", new DefaultResourceFactory().getString("../site/Error.html"));
        return createHttpResponse(NanoHTTPD.Response.Status.NOT_FOUND, "text/html", new DefaultResourceFactory().getString("../site/Error.html"));
    }

    private NanoHTTPD.Response createHttpResponse(final NanoHTTPD.Response.Status httpStatus, String contentType, String body)
    {
        return NanoHTTPD.newFixedLengthResponse(httpStatus, contentType, body);
    }
}
