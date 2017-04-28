package magiccardserver.WebRequests;

import com.google.gson.Gson;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;

public class ReadWriteJsonWebRequest<Input, Output> implements WebRequest<Output> {
    private final URL url;
    private final Input content;
    private final Class<Output> outputType;
    private final String method;
    private final Gson gson;

    public ReadWriteJsonWebRequest(String url, Input content, Class<Output> outputType, String method) {
        this(new UrlFromString(url).get(), content, outputType, method, new Gson());
    }

    public ReadWriteJsonWebRequest(URL url, Input content, Class<Output> outputType, String method) {
        this(url, content, outputType, method, new Gson());
    }

    private ReadWriteJsonWebRequest(URL url, Input content, Class<Output> outputType, String method, Gson gson) {
        this.url = url;
        this.content = content;
        this.outputType = outputType;
        this.method = method;
        this.gson = gson;
    }

    public Output resolve() {
        InputStream stream = new ReadWriteWebRequest(url, gson.toJson(content), "application/json; charset=UTF-8", "application/json", method).resolve();
        return gson.fromJson(new InputStreamReader(stream), outputType);
    }
}
