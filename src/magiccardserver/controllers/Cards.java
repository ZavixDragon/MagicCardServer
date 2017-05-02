package magiccardserver.controllers;

import com.google.gson.Gson;
import magiccardserver.*;
import magiccardserver.WebRequests.ReadJsonWebRequest;
import magiccardserver.WebRequests.ReadWebRequest;
import magiccardserver.WebRequests.ReadWriteJsonWebRequest;
import magiccardserver.dto.CouchDBDocuments;
import magiccardserver.dto.CouchDBWriteResponse;

import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.OpenOption;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Cards implements Controller {
    private final Gson gson;
    private final String path;

    public Cards() {
        this(new Gson());
    }

    public Cards(Gson gson) {
        this.gson = gson;
        path = System.getenv("APPDATA") + "\\MagicCardServer\\Cards";
    }

    public String getDomain() { return "Cards"; }

    public NanoHTTPD.Response serve(NanoHTTPD.IHTTPSession session) {
        ensureDirectoryExists();
        String content = new InputStreamToString(session.getInputStream()).get();
        String webCall = session.getUri().split("/")[session.getUri().split("/").length - 1];
        if (webCall.equalsIgnoreCase("readallcards"))
            return NanoHTTPD.newFixedLengthResponse(gson.toJson(readAllIds()));
        if (webCall.equalsIgnoreCase("readcard"))
            return NanoHTTPD.newFixedLengthResponse(readCard(content));
        if (webCall.equalsIgnoreCase("writecard"))
            return NanoHTTPD.newFixedLengthResponse(gson.toJson(writeCard(gson.fromJson(content, AuthorizedRequest.class))));
        else
            throw new RuntimeException(webCall + "is an invalid API call");
    }

    private void ensureDirectoryExists() {
        File file1 = new File(System.getenv("APPDATA") + "\\MagicCardServer");
        if (!file1.exists() || !file1.isDirectory())
            file1.mkdir();

        File file2 = new File(path);
        if (!file2.exists() || !file2.isDirectory())
            file2.mkdir();
    }

    private boolean writeCard(AuthorizedRequest request) {
        if (!new Authorization(request.getPassword()).get())
            return false;
        try {
            Files.write(Paths.get(path + "\\" + request.getCard().getId()), gson.toJson(request.getCard()).getBytes());
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    private String readCard(String id) {
        try {
            return new String(Files.readAllBytes(Paths.get(path + "\\" + id)));
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    private List<String> readAllIds() {
        return Arrays.stream(new File(path).listFiles()).map(x -> x.getName()).collect(Collectors.toList());
    }
}
