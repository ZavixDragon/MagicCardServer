package magiccardserver;

public class UnknownResourceException extends RuntimeException {
    public UnknownResourceException(String resourceName) {
        super("Could not find resource: " + resourceName);
    }
}
