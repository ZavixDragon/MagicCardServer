package magiccardserver;

import magiccardserver.controllers.Cards;
import magiccardserver.controllers.EditCard;
import magiccardserver.controllers.PasswordController;
import magiccardserver.controllers.ViewCard;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class Main {
    public static void main(String[] args) {
        Properties props = new Properties();
        try {
            props.load(new FileInputStream("server.config"));
        }
        catch(IOException e) {
            e.printStackTrace();
        }
        new NanoWebsite(9999, props.getProperty("resources"), "NotFound",
                new EditCard(props.getProperty("resources")),
                new ViewCard(props.getProperty("resources")),
                new Cards(),
                new PasswordController()).start();
    }
}
