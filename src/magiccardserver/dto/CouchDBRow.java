package magiccardserver.dto;

public class CouchDBRow {
    private String id;
    private String key;
    private CouchDBValue value;

    public String getId() {
        return id;
    }

    public String getKey() {
        return key;
    }

    public CouchDBValue getValue() {
        return this.value;
    }
}

