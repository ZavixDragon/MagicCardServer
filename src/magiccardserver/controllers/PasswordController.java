package magiccardserver.controllers;

import com.google.gson.Gson;
import magiccardserver.EncryptedString;
import magiccardserver.NanoHTTPD;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class PasswordController implements Controller {
    private final Gson gson;
    private final String path;

    public PasswordController() {
        this(new Gson());
    }

    public PasswordController(Gson gson) {
        this.gson = gson;
        path = System.getenv("APPDATA") + "\\MagicCardServer\\Passwords.txt";
    }

    public String getDomain() { return "Password"; }

    public NanoHTTPD.Response serve(NanoHTTPD.IHTTPSession session) {
        ensureFileExists();
        String password = new EncryptedString(session.getUri().split("/")[session.getUri().split("/").length - 1]).get();
        try {
            Files.write(Paths.get(path), password.getBytes(), StandardOpenOption.APPEND);
            return NanoHTTPD.newFixedLengthResponse("true");
        } catch (IOException e) {
            e.printStackTrace();
            return NanoHTTPD.newFixedLengthResponse("false");
        }
    }

    private void ensureFileExists() {
        File file1 = new File(System.getenv("APPDATA") + "\\MagicCardServer");
        if (!file1.exists() || !file1.isDirectory())
            file1.mkdir();

        File file = new File(path);
        if (!file.exists()) {
            try {
                file.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
