package magiccardserver;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

public class WebsiteServer {
    public final Map<String, String> mimeTypes = new HashMap<String, String>() {{
       put("html", "text/html");
       put("js", "text/javascript");
       put("css", "text/css");
       put("ico", "image/x-icon");
    }};
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
            return createHttpResponse(NanoHTTPD.Response.Status.NOT_FOUND, "text/html", new DefaultResourceFactory().getInputStream("../site/Error.html"));

        System.out.println(uri);

        if(uri.equals("/"))
            return createHttpResponse(NanoHTTPD.Response.Status.OK, "text/html", new DefaultResourceFactory().getInputStream("../site/Main.html"));

        String[] uriParts = uri.split("\\.");
        String extension = uriParts[uriParts.length - 1];
        String mimeType = mimeTypes.get(extension);
        return createHttpResponse(NanoHTTPD.Response.Status.OK, mimeType, new DefaultResourceFactory().getInputStream("../site/" + uri));
    }

    private NanoHTTPD.Response createHttpResponse(final NanoHTTPD.Response.Status httpStatus, String contentType, InputStream body)
    {
        return NanoHTTPD.newChunkedResponse(httpStatus, contentType, body);
    }
}
