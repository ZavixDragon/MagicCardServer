package magiccardserver.dto;

public class CouchDBWriteResponse {
    private boolean ok;
    private String id;
    private String rev;

    public boolean isOk() {
        return ok;
    }
}
