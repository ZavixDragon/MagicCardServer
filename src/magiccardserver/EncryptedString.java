package magiccardserver;

import java.security.MessageDigest;

public class EncryptedString {
    private final String str;

    public EncryptedString(String str) {
        this.str = str;
    }

    public String get() {
        try {
            String saltedPassword = str + "Pepper!";
            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
            messageDigest.update(saltedPassword.getBytes());
            return new String(messageDigest.digest());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
}
