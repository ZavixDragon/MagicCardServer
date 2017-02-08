package magiccardserver;

import java.io.InputStream;
import java.net.URL;
import java.util.Scanner;

public class DefaultResourceFactory {
    public String getResource(final String resourceName)
    {
        return getResourceURL(resourceName).toString();
    }

    public URL getResourceURL(final String resourceName)
    {
        URL resource = getClass().getResource(resourceName);
        if (resource == null)
            throw new UnknownResourceException(resourceName);
        return resource;
    }

    public byte[] getBytes(final String resourceName)
    {
        return InputStreamToBytes.getBytes(getClass().getResourceAsStream(resourceName));
    }

    public String getString(final String resourceName)
    {
        Scanner s = new Scanner(getClass().getResourceAsStream(resourceName)).useDelimiter("\\A");
        return s.hasNext() ? s.next() : "";
    }

    public InputStream getInputStream(final String resourceName)
    {
        return getClass().getResourceAsStream(resourceName);
    }
}
