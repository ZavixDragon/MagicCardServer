package magiccardserver.dto;

import java.util.ArrayList;

public class CouchDBDocumentsWith {
    private int total_rows;
    private int offset;
    private ArrayList<CouchDBRowWith> rows;

    public ArrayList<CouchDBRowWith> getRows() {
        return rows;
    }
}
