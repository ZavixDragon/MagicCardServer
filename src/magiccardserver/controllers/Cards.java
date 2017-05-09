package magiccardserver.controllers;

import com.google.gson.Gson;
import magiccardserver.*;
import magiccardserver.WebRequests.ReadJsonWebRequest;
import magiccardserver.WebRequests.ReadWebRequest;
import magiccardserver.WebRequests.ReadWriteJsonWebRequest;
import magiccardserver.domain.Card;
import magiccardserver.dto.CouchDBDocuments;
import magiccardserver.dto.CouchDBWriteResponse;

import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.OpenOption;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Cards implements Controller {
    private final List<String> validPasswords;
    private final Gson gson;
    private final String path;

    public Cards(List<String> validPasswords) {
        this(validPasswords, new Gson());
    }

    public Cards(List<String> validPasswords, Gson gson) {
        this.validPasswords = validPasswords;
        this.gson = gson;
        path = System.getenv("APPDATA") + "\\MagicCardServer\\Cards";
    }

    public String getDomain() { return "Cards"; }

    public NanoHTTPD.Response serve(NanoHTTPD.IHTTPSession session) {
        new PerformanceCheckedAction(() -> ensureDirectoryExists(), "Ensured Directories Exist").run();
        String webCall = session.getUri().split("/")[2];
        if (webCall.equalsIgnoreCase("readallcards"))
            return NanoHTTPD.newFixedLengthResponse(gson.toJson(readAllIds()));
        if (webCall.equalsIgnoreCase("readcard")) {
            String card = readCard(session.getUri().split("/")[3]);
            return (NanoHTTPD.Response) new PerformanceCheckedSupplier(() -> NanoHTTPD.newFixedLengthResponse(card), "Converted card string to content").get();
        }
        if (webCall.equalsIgnoreCase("writecard"))
            return writeCard(session);
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

    private NanoHTTPD.Response writeCard(NanoHTTPD.IHTTPSession session) {
        String content = (String) new PerformanceCheckedSupplier(() -> new InputStreamToString(session.getInputStream()).get(), "Read content as string").get();
        AuthorizedRequest request = gson.fromJson(content, AuthorizedRequest.class);
        if (!validPasswords.stream().anyMatch(x -> x.equals(request.getPassword())))
            return NanoHTTPD.newFixedLengthResponse(NanoHTTPD.Response.Status.UNAUTHORIZED, "text/plain", "Invalid Password, git gud noob!");
        boolean result = writeCardToDisk(request.getCard());
        return (NanoHTTPD.Response) new PerformanceCheckedSupplier(() -> NanoHTTPD.newFixedLengthResponse(result ? NanoHTTPD.Response.Status.ACCEPTED : NanoHTTPD.Response.Status.INTERNAL_ERROR, "text/plain", "Attempt to write card"), "Converted boolean to nano response").get();

    }

    private boolean writeCardToDisk(Card card) {
        return (boolean)new PerformanceCheckedSupplier(() -> {
            try {
                Files.write(Paths.get(path + "\\" + card.getId()), gson.toJson(card).getBytes());
                return true;
            } catch (IOException e) {
                e.printStackTrace();
                return false;
            }
        }, "Wrote card to disk").get();
    }

    private String readCard(String id) {
        return (String) new PerformanceCheckedSupplier(() -> {
            try {
                return new String(Files.readAllBytes(Paths.get(path + "\\" + id)));
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }
        }, "read card from IO system").get();
    }

    private List<String> readAllIds() {
        return (List<String>) new PerformanceCheckedSupplier(() -> Arrays.stream(new File(path).listFiles()).map(x -> x.getName()).collect(Collectors.toList()), "Read meta data from files").get();
    }
}
