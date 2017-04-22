package magiccardserver;

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

    public InputStream serve(String url) {
        InputStream stream = getClass().getResourceAsStream(siteResourcePath + "/Edit/EditCard.html");
        String str = new InputStreamToString(stream).get();
        String newStr = url.split("/")[2].equals("none") ? str : str.replace("none", url.split("/")[2]);
        return new ByteArrayInputStream(newStr.getBytes(StandardCharsets.UTF_8));
    }
}
