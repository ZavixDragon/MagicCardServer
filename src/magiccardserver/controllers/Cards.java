package magiccardserver.controllers;

import com.google.gson.Gson;
import magiccardserver.*;
import magiccardserver.WebRequests.ReadJsonWebRequest;
import magiccardserver.WebRequests.ReadWebRequest;
import magiccardserver.WebRequests.ReadWriteJsonWebRequest;
import magiccardserver.WebRequests.WriteJsonWebRequest;
import magiccardserver.dto.Card;
import magiccardserver.dto.CouchDBDocuments;
import magiccardserver.dto.CouchDBWriteResponse;

import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

public class Cards implements Controller {
    private final Gson gson;

    public Cards() {
        this(new Gson());
    }

    public Cards(Gson gson) {
        this.gson = gson;
    }

    public String getDomain() { return "Cards"; }

    public NanoHTTPD.Response serve(NanoHTTPD.IHTTPSession session) {
        String content = new InputStreamToString(session.getInputStream()).get();
        String webCall = session.getUri().split("/")[session.getUri().split("/").length - 1];
        if (webCall.equalsIgnoreCase("readallcards"))
            return NanoHTTPD.newFixedLengthResponse(gson.toJson(readAllIds()));
        if (webCall.equalsIgnoreCase("readcard"))
            return NanoHTTPD.newChunkedResponse(NanoHTTPD.Response.Status.OK, "application/json", readCard(content));
        if (webCall.equalsIgnoreCase("writecard"))
            return NanoHTTPD.newFixedLengthResponse(gson.toJson(writeCard(gson.fromJson(content, AuthorizedRequest.class))));
        else
            throw new RuntimeException(webCall + "is an invalid API call");
    }

    private boolean writeCard(AuthorizedRequest request) {
        if (!new Authorization(request.GetPassword()).get())
            return false;
        CouchDBWriteResponse response = new ReadWriteJsonWebRequest<>("http://127.0.0.2:5984/cards", request.GetCard(), CouchDBWriteResponse.class, "POST").resolve();
        return response.isOk();
    }

    private InputStream readCard(String id) {
        return new ReadWebRequest("http://127.0.0.2:5984/cards/" + id).resolve();
    }

    private List<String> readAllIds() {
        CouchDBDocuments docs = new ReadJsonWebRequest<>("http://127.0.0.2:5984/cards/_all_docs", CouchDBDocuments.class).resolve();
        return docs.getRows().stream().map(x -> x.getKey()).collect(Collectors.toList());
    }
}
