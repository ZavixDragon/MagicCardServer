package magiccardserver.domain;

import java.util.ArrayList;

public class Card {
    private String id;
    private String author;
    private String name;
    private ArrayList<String> cost;
    private ArrayList<String> types;
    private ArrayList<String> subtypes;
    private String rarity;
    private String text;
    private double power;
    private double toughness;
    private double loyalty;
    private String imageId;
    private boolean isDeleted;

    public String getId() {
        return id;
    }
}
