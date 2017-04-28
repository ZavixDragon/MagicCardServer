package magiccardserver.WebRequests;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

public class ReadStringWebRequest implements WebRequest<String> {
    private final URL url;
    private final String method;

    public ReadStringWebRequest(String url) {
        this(url, "GET");
    }

    public ReadStringWebRequest(String url, String method) {
        this(new UrlFromString(url).get(), method);
    }

    public ReadStringWebRequest(URL url) {
        this(url, "GET");
    }

    public ReadStringWebRequest(URL url, String method) {
        this.url = url;
        this.method = method;
    }

    public String resolve() {
        try {
            InputStream stream = new ReadWebRequest(url, method).resolve();
            BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = reader.readLine()) != null)
                response.append(inputLine);
            reader.close();
            return response.toString();
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
}
