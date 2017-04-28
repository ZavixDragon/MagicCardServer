package magiccardserver.dto;

import java.util.ArrayList;

public class Card {
    private String _id;
    private String _rev;
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
    private String image;
    private boolean isDeleted;
}
