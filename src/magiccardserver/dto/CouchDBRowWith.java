package magiccardserver.dto;

import com.google.gson.internal.LinkedTreeMap;

public class CouchDBRowWith {
    private String id;
    private String key;
    private CouchDBValue value;
    private LinkedTreeMap doc;

    public String getId() {
        return id;
    }

    public String getKey() {
        return key;
    }

    public CouchDBValue getValue() {
        return this.value;
    }

    public LinkedTreeMap getDoc() {
        return doc;
    }
}
