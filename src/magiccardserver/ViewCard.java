package magiccardserver;

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

    public InputStream serve(String url) {
        InputStream stream = getClass().getResourceAsStream(siteResourcePath + "/View/ViewCard.html");
        String str = new InputStreamToString(stream).get();
        String newStr = str.replace("none", url.split("/")[2]);
        return new ByteArrayInputStream(newStr.getBytes(StandardCharsets.UTF_8));
    }
}
