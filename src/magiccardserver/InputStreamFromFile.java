package magiccardserver;

import java.io.FileInputStream;
import java.io.InputStream;

public class InputStreamFromFile {
    private final String _path;

    public InputStreamFromFile(String filePath) {
        _path = filePath;
    }

    public InputStream get() {
        try {
            return new FileInputStream(_path);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
