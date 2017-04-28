package magiccardserver.controllers;

import magiccardserver.NanoHTTPD;

public interface Controller {
    String getDomain();
    NanoHTTPD.Response serve(NanoHTTPD.IHTTPSession session);
}
