package magiccardserver;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Authorization {
    private final String password;
    private final String path;

    public Authorization(String password) {
        this.password = password;
        path = System.getenv("APPDATA") + "/MagicCardServer/Passwords.txt";
    }

    public boolean get() {
        String encryptedPassword = new EncryptedString(password).get();
        try {
            return Files.readAllLines(Paths.get(path)).stream().anyMatch(x -> x.equals(encryptedPassword));
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }
}
