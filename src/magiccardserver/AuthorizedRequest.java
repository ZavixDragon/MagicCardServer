package magiccardserver;

import magiccardserver.domain.Card;

public class AuthorizedRequest {
    private String password;
    private Card card;

    public String getPassword() {
        return password;
    }

    public Card getCard() {
        return card;
    }
}
