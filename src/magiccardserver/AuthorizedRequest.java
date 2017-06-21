package magiccardserver;

import magiccardserver.domain.Card;

public class AuthorizedRequest {
    private String username;
    private String password;
    private Card card;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public Card getCard() {
        return card;
    }
}
