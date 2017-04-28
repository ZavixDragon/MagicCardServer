package magiccardserver.WebRequests;

import java.net.MalformedURLException;
import java.net.URL;

public class UrlFromString {
    private String url;

    public UrlFromString(String url) {
        this.url = url;
    }

    public URL get() {
        try {
            return new URL(url);
        } catch (MalformedURLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
}
