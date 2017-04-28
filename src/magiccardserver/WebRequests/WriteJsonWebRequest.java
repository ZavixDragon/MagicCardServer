package magiccardserver.WebRequests;

import com.google.gson.Gson;
import java.net.URL;

public class WriteJsonWebRequest <Input> implements WebRequest<Boolean> {
    private final URL url;
    private final Input content;
    private final String method;
    private final Gson gson;

    public WriteJsonWebRequest(String url, Input content, String method) {
        this(new UrlFromString(url).get(), content, method, new Gson());
    }

    public WriteJsonWebRequest(URL url, Input content, String method) {
        this(url, content, method, new Gson());
    }

    private WriteJsonWebRequest(URL url, Input content, String method, Gson gson) {
        this.url = url;
        this.content = content;
        this.method = method;
        this.gson = gson;
    }

    public Boolean resolve() {
        return new WriteWebRequest(url, gson.toJson(content), "application/json; charset=UTF-8", method).resolve();
    }
}
