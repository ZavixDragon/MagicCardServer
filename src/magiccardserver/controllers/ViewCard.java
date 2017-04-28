package magiccardserver.controllers;

import magiccardserver.InputStreamFromFile;
import magiccardserver.InputStreamToString;
import magiccardserver.NanoHTTPD;
import magiccardserver.controllers.Controller;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class ViewCard implements Controller {
    private final String siteResourcePath;

    public ViewCard(String siteResourcePath) {
        this.siteResourcePath = siteResourcePath;
    }

    public String getDomain() {
        return "ViewCard";
    }

    public NanoHTTPD.Response serve(NanoHTTPD.IHTTPSession session) {
        String url = session.getUri();
        InputStream stream = new InputStreamFromFile(siteResourcePath + "/View/ViewCard.html").get();
        String str = new InputStreamToString(stream).get();
        String newStr = str.replace("none", url.split("/")[2]);
        return NanoHTTPD.newChunkedResponse(NanoHTTPD.Response.Status.OK, "text/html", new ByteArrayInputStream(newStr.getBytes(StandardCharsets.UTF_8)));
    }
}
