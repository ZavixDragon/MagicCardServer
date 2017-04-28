package magiccardserver.WebRequests;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

public class WriteWebRequest implements WebRequest<Boolean> {
    private final URL url;
    private final String content;
    private final String contentType;
    private final String method;

    public WriteWebRequest(String url, String content, String contentType, String method) {
        this(new UrlFromString(url).get(), content, contentType, method);
    }

    public WriteWebRequest(URL url, String content, String contentType, String method) {
        this.url = url;
        this.content = content;
        this.contentType = contentType;
        this.method = method;
    }

    public Boolean resolve() {
        try {
            HttpURLConnection connection = openConnection();
            write(connection);
            return true;
        } catch(Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private HttpURLConnection openConnection() throws IOException {
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod(method);
        connection.setDoOutput(true);
        connection.setDoInput(true);
        connection.setRequestProperty("Content-Type", contentType);
        return connection;
    }

    private void write(HttpURLConnection connection) throws IOException {
        OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream());
        writer.write(content);
        writer.flush();
        writer.close();
    }
}