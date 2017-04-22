package magiccardserver;

import java.io.InputStream;

public interface Controller {
    String getDomain();
    InputStream serve(String url);
}
