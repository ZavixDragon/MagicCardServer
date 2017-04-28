package magiccardserver.controllers;

import magiccardserver.InputStreamFromFile;
import magiccardserver.InputStreamToString;
import magiccardserver.NanoHTTPD;
import magiccardserver.controllers.Controller;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class EditCard implements Controller {
    private final String siteResourcePath;

    public EditCard(String siteResourcePath) {
        this.siteResourcePath = siteResourcePath;
    }

    public String getDomain() {
        return "EditCard";
    }

    public NanoHTTPD.Response serve(NanoHTTPD.IHTTPSession session) {
        String url = session.getUri();
        InputStream stream = new InputStreamFromFile(siteResourcePath + "/Edit/EditCard.html").get();
        String str = new InputStreamToString(stream).get();
        String newStr = url.split("/")[2].equals("none") ? str : str.replace("none", url.split("/")[2]);
        return NanoHTTPD.newChunkedResponse(NanoHTTPD.Response.Status.OK, "text/html", new ByteArrayInputStream(newStr.getBytes(StandardCharsets.UTF_8)));
    }
}
