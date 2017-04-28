package magiccardserver;

import magiccardserver.WebRequests.ReadJsonWebRequest;
import magiccardserver.dto.CouchDBDocuments;
import magiccardserver.dto.CouchDBDocumentsWith;
import magiccardserver.dto.Password;

import java.security.MessageDigest;

public class Authorization {
    private final String password;

    public Authorization(String password) {
        this.password = password;
    }

    public boolean get() {
        String encryptedPassword = new EncryptedString(password).get();
        CouchDBDocumentsWith passwords = new ReadJsonWebRequest<>("http://127.0.0.2:5984/passwords/_all_docs?include_docs=true", CouchDBDocumentsWith.class).resolve();
        return passwords.getRows().stream().anyMatch(x -> x.getDoc().get("password").equals(encryptedPassword));
    }
}
