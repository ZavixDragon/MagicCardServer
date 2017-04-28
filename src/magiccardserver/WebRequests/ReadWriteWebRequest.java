package magiccardserver.WebRequests;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

public class ReadWriteWebRequest implements WebRequest<InputStream> {
    private final URL url;
    private final String content;
    private final String contentType;
    private final String outputType;
    private final String method;

    public ReadWriteWebRequest(String url, String content, String contentType, String outputType, String method) {
        this(new UrlFromString(url).get(), content, contentType, outputType, method);
    }

    public ReadWriteWebRequest(URL url, String content, String contentType, String outputType, String method) {
        this.url = url;
        this.content = content;
        this.contentType = contentType;
        this.outputType = outputType;
        this.method = method;
    }

    public InputStream resolve() {
        try {
            HttpURLConnection connection = openConnection();
            write(connection);
            return connection.getInputStream();
        } catch(Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    private HttpURLConnection openConnection() throws IOException {
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod(method);
        connection.setDoOutput(true);
        connection.setDoInput(true);
        connection.setRequestProperty("Content-Type", contentType);
        connection.setRequestProperty("Accept", outputType);
        return connection;
    }

    private void write(HttpURLConnection connection) throws IOException {
        OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream());
        writer.write(content);
        writer.flush();
        writer.close();
    }
}
