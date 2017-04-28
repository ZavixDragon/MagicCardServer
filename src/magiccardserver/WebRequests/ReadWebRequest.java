package magiccardserver.WebRequests;

import jdk.internal.util.xml.impl.Input;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

public class ReadWebRequest implements WebRequest<InputStream> {
    private final URL url;
    private final String method;

    public ReadWebRequest(String url) {
        this(url, "GET");
    }

    public ReadWebRequest(String url, String method) {
        this(new UrlFromString(url).get(), method);
    }

    public ReadWebRequest(URL url) {
        this(url, "GET");
    }

    public ReadWebRequest(URL url, String method) {
        this.url = url;
        this.method = method;
    }

    public InputStream resolve() {
        try {
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod(method);
            return connection.getInputStream();
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
}
