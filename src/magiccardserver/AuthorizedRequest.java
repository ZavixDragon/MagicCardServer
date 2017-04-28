package magiccardserver;

import magiccardserver.dto.Card;

public class AuthorizedRequest {
    private String password;
    private Card card;

    public String GetPassword() {
        return password;
    }

    public Card GetCard() {
        return card;
    }
}
