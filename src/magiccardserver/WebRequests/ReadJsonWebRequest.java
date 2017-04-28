package magiccardserver.WebRequests;

import com.google.gson.Gson;

import java.net.URL;

public class ReadJsonWebRequest<Output> implements WebRequest<Output> {
    private final URL url;
    private final Class<Output> type;
    private final String method;
    private final Gson gson;

    public ReadJsonWebRequest(String url, Class<Output> type) {
        this(url, type, "GET");
    }

    public ReadJsonWebRequest(URL url, Class<Output> type) {
        this(url, type, "GET");
    }

    public ReadJsonWebRequest(String url, Class<Output> type, String method) {
        this(new UrlFromString(url).get(), type, method);
    }

    public ReadJsonWebRequest(URL url, Class<Output> type, String method) {
        this(url, type, method, new Gson());
    }

    private ReadJsonWebRequest(URL url, Class<Output> type, String method, Gson gson) {
        this.url = url;
        this.type = type;
        this.method = method;
        this.gson = gson;
    }

    public Output resolve() {
        String result = new ReadStringWebRequest(url, method).resolve();
        return gson.fromJson(result, type);
    }
}
