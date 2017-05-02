package magiccardserver.domain;

public class Password {
    private String _id;
    private String _rev;
    private String password;

    public Password(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }
}
