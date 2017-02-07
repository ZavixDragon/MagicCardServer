package magiccardserver;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class InputStreamToBytes {
    private InputStreamToBytes()
    {
    }

    public static byte[] getBytes(final InputStream inputStream)
    {
        try
        {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            while(true)
            {
                int r = inputStream.read(buffer);
                if(r == -1) break;
                out.write(buffer, 0, r);
            }

            return out.toByteArray();
        }
        catch(IOException e)
        {
            throw new RuntimeException(e);
        }
    }
}
