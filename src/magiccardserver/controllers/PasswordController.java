package magiccardserver.controllers;

import com.google.gson.Gson;
import magiccardserver.EncryptedString;
import magiccardserver.NanoHTTPD;
import magiccardserver.WebRequests.ReadWriteJsonWebRequest;
import magiccardserver.WebRequests.WriteJsonWebRequest;
import magiccardserver.dto.CouchDBWriteResponse;
import magiccardserver.dto.Password;

public class PasswordController implements Controller {
    private final Gson gson;

    public PasswordController() {
        this(new Gson());
    }

    public PasswordController(Gson gson) {
        this.gson = gson;
    }

    public String getDomain() { return "Password"; }

    public NanoHTTPD.Response serve(NanoHTTPD.IHTTPSession session) {
        CouchDBWriteResponse response = new ReadWriteJsonWebRequest<>(
                "http://127.0.0.2:5984/passwords",
                new Password(new EncryptedString(session.getUri().split("/")[session.getUri().split("/").length - 1]).get()),
                CouchDBWriteResponse.class,
                "POST").resolve();
        return NanoHTTPD.newFixedLengthResponse(Boolean.toString(response.isOk()));
    }
}
