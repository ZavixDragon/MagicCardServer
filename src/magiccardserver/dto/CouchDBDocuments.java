package magiccardserver.dto;

import java.util.ArrayList;

public class CouchDBDocuments {
    private int total_rows;
    private int offset;
    private ArrayList<CouchDBRow> rows;

    public ArrayList<CouchDBRow> getRows() {
        return rows;
    }
}

