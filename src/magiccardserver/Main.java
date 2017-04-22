package magiccardserver;

public class Main {
    public static void main(String[] args) {
        new NanoWebsite(9999, "../site", "NotFound", new EditCard("../site"), new ViewCard("../site")).start();
    }
}
