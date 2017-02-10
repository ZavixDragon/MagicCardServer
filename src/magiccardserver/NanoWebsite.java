package magiccardserver;

import java.io.*;
import java.util.*;
import java.util.function.Function;

public class NanoWebsite {
    private final HttpServer server;
    private String siteResourcePath;
    private String pageNotFoundPage;

    public NanoWebsite(int port, String siteResourcePath, String pageNotFoundPage) {
        server = new HttpServer(port);
        server.setServeFunction(this::serve);
        this.siteResourcePath = siteResourcePath;
        this.pageNotFoundPage = pageNotFoundPage;
    }

    public void start() {
        server.start();
    }

    public void stop() {
        server.stop();
    }

    private NanoHTTPD.Response serve(NanoHTTPD.IHTTPSession session) {
        String uri = new ExtractedUri(session).get();
        if (new Resource(siteResourcePath + uri).get() == null)
            uri = new ExtractedUri(pageNotFoundPage).get();
        return NanoHTTPD.newChunkedResponse(NanoHTTPD.Response.Status.OK, new MimeType(uri).get(), new Resource(siteResourcePath + uri).get());
    }

    private final class ExtractedUri {
        private String uri;

        public ExtractedUri(NanoHTTPD.IHTTPSession session) {
            this(session.getUri());
        }

        public ExtractedUri(String uri) {
            this.uri = uri;
        }

        public String get() {
            if (uri.charAt(0) != '/')
                uri = "/" + uri;
            if (uri.charAt(uri.length() - 1) == '/')
                uri += "Index.html";
            int extensionIndex = uri.lastIndexOf('.');
            if (extensionIndex == -1)
                uri += ".html";
            return uri;
        }
    }

    private final class Resource {
        private final String name;

        public Resource(String name) {
            this.name = name;
        }

        public InputStream get() {
            return getClass().getResourceAsStream(name);
        }
    }

    private final class HttpServer extends NanoHTTPD {
        private Function<IHTTPSession, Response> _serveFunction;

        public HttpServer(final int port) {
            super(port);
        }

        public Response serve(IHTTPSession session) {
            if (_serveFunction != null)
                return _serveFunction.apply(session);
            return super.serve(session);
        }

        public void start() {
            try {
                start(SOCKET_READ_TIMEOUT, false);
            } catch (IOException e) {
                throw new RuntimeException("Unable to start Http server.", e);
            }
        }

        public void setServeFunction(final Function<IHTTPSession, Response> serveFunction) {
            _serveFunction = serveFunction;
        }
    }

    private final class MimeType {
        public final Map<String, String> mimeTypes = new HashMap<String, String>() {{
            put("3dm","x-world/x-3dmf");
            put("3dmf","x-world/x-3dmf");
            put("a","application/octet-stream");
            put("aab","application/x-authorware-bin");
            put("aam","application/x-authorware-map");
            put("aas","application/x-authorware-seg");
            put("abc","text/vnd.abc");
            put("acgi","text/html");
            put("afl","video/animaflex");
            put("ai","application/postscript");
            put("aif","audio/aiff");
            put("aif","audio/x-aiff");
            put("aifc","audio/aiff");
            put("aifc","audio/x-aiff");
            put("aiff","audio/aiff");
            put("aiff","audio/x-aiff");
            put("aim","application/x-aim");
            put("aip","text/x-audiosoft-intra");
            put("ani","application/x-navi-animation");
            put("aos","application/x-nokia-9000-communicator-add-on-software");
            put("aps","application/mime");
            put("arc","application/octet-stream");
            put("arj","application/arj");
            put("arj","application/octet-stream");
            put("art","image/x-jg");
            put("asf","video/x-ms-asf");
            put("asm","text/x-asm");
            put("asp","text/asp");
            put("asx","application/x-mplayer2");
            put("asx","video/x-ms-asf");
            put("asx","video/x-ms-asf-plugin");
            put("au","audio/basic");
            put("au","audio/x-au");
            put("avi","application/x-troff-msvideo");
            put("avi","video/avi");
            put("avi","video/msvideo");
            put("avi","video/x-msvideo");
            put("avs","video/avs-video");
            put("bcpio","application/x-bcpio");
            put("bin","application/mac-binary");
            put("bin","application/macbinary");
            put("bin","application/octet-stream");
            put("bin","application/x-binary");
            put("bin","application/x-macbinary");
            put("bm","image/bmp");
            put("bmp","image/bmp");
            put("bmp","image/x-windows-bmp");
            put("boo","application/book");
            put("book","application/book");
            put("boz","application/x-bzip2");
            put("bsh","application/x-bsh");
            put("bz","application/x-bzip");
            put("bz2","application/x-bzip2");
            put("c","text/plain");
            put("c","text/x-c");
            put("c++","text/plain");
            put("cat","application/vnd.ms-pki.seccat");
            put("cc","text/plain");
            put("cc","text/x-c");
            put("ccad","application/clariscad");
            put("cco","application/x-cocoa");
            put("cdf","application/cdf");
            put("cdf","application/x-cdf");
            put("cdf","application/x-netcdf");
            put("cer","application/pkix-cert");
            put("cer","application/x-x509-ca-cert");
            put("cha","application/x-chat");
            put("chat","application/x-chat");
            put("class","application/java");
            put("class","application/java-byte-code");
            put("class","application/x-java-class");
            put("com","application/octet-stream");
            put("com","text/plain");
            put("conf","text/plain");
            put("cpio","application/x-cpio");
            put("cpp","text/x-c");
            put("cpt","application/mac-compactpro");
            put("cpt","application/x-compactpro");
            put("cpt","application/x-cpt");
            put("crl","application/pkcs-crl");
            put("crl","application/pkix-crl");
            put("crt","application/pkix-cert");
            put("crt","application/x-x509-ca-cert");
            put("crt","application/x-x509-user-cert");
            put("csh","application/x-csh");
            put("csh","text/x-script.csh");
            put("css","application/x-pointplus");
            put("css","text/css");
            put("cxx","text/plain");
            put("dcr","application/x-director");
            put("deepv","application/x-deepv");
            put("def","text/plain");
            put("der","application/x-x509-ca-cert");
            put("dif","video/x-dv");
            put("dir","application/x-director");
            put("dl","video/dl");
            put("dl","video/x-dl");
            put("doc","application/msword");
            put("dot","application/msword");
            put("dp","application/commonground");
            put("drw","application/drafting");
            put("dump","application/octet-stream");
            put("dv","video/x-dv");
            put("dvi","application/x-dvi");
            put("dwf","drawing/x-dwf(old)");
            put("dwf","model/vnd.dwf");
            put("dwg","application/acad");
            put("dwg","image/vnd.dwg");
            put("dwg","image/x-dwg");
            put("dxf","application/dxf");
            put("dxf","image/vnd.dwg");
            put("dxf","image/x-dwg");
            put("dxr","application/x-director");
            put("el","text/x-script.elisp");
            put("elc","application/x-bytecode.elisp(compiledelisp)");
            put("elc","application/x-elc");
            put("env","application/x-envoy");
            put("eps","application/postscript");
            put("es","application/x-esrehber");
            put("etx","text/x-setext");
            put("evy","application/envoy");
            put("evy","application/x-envoy");
            put("exe","application/octet-stream");
            put("f","text/plain");
            put("f","text/x-fortran");
            put("f77","text/x-fortran");
            put("f90","text/plain");
            put("f90","text/x-fortran");
            put("fdf","application/vnd.fdf");
            put("fif","application/fractals");
            put("fif","image/fif");
            put("fli","video/fli");
            put("fli","video/x-fli");
            put("flo","image/florian");
            put("flx","text/vnd.fmi.flexstor");
            put("fmf","video/x-atomic3d-feature");
            put("for","text/plain");
            put("for","text/x-fortran");
            put("fpx","image/vnd.fpx");
            put("fpx","image/vnd.net-fpx");
            put("frl","application/freeloader");
            put("funk","audio/make");
            put("g","text/plain");
            put("g3","image/g3fax");
            put("gif","image/gif");
            put("gl","video/gl");
            put("gl","video/x-gl");
            put("gsd","audio/x-gsm");
            put("gsm","audio/x-gsm");
            put("gsp","application/x-gsp");
            put("gss","application/x-gss");
            put("gtar","application/x-gtar");
            put("gz","application/x-compressed");
            put("gz","application/x-gzip");
            put("gzip","application/x-gzip");
            put("gzip","multipart/x-gzip");
            put("h","text/plain");
            put("h","text/x-h");
            put("hdf","application/x-hdf");
            put("help","application/x-helpfile");
            put("hgl","application/vnd.hp-hpgl");
            put("hh","text/plain");
            put("hh","text/x-h");
            put("hlb","text/x-script");
            put("hlp","application/hlp");
            put("hlp","application/x-helpfile");
            put("hlp","application/x-winhelp");
            put("hpg","application/vnd.hp-hpgl");
            put("hpgl","application/vnd.hp-hpgl");
            put("hqx","application/binhex");
            put("hqx","application/binhex4");
            put("hqx","application/mac-binhex");
            put("hqx","application/mac-binhex40");
            put("hqx","application/x-binhex40");
            put("hqx","application/x-mac-binhex40");
            put("hta","application/hta");
            put("htc","text/x-component");
            put("htm","text/html");
            put("html","text/html");
            put("htmls","text/html");
            put("htt","text/webviewhtml");
            put("htx","text/html");
            put("ice","x-conference/x-cooltalk");
            put("ico","image/x-icon");
            put("idc","text/plain");
            put("ief","image/ief");
            put("iefs","image/ief");
            put("iges","application/iges");
            put("iges","model/iges");
            put("igs","application/iges");
            put("igs","model/iges");
            put("ima","application/x-ima");
            put("imap","application/x-httpd-imap");
            put("inf","application/inf");
            put("ins","application/x-internett-signup");
            put("ip","application/x-ip2");
            put("isu","video/x-isvideo");
            put("it","audio/it");
            put("iv","application/x-inventor");
            put("ivr","i-world/i-vrml");
            put("ivy","application/x-livescreen");
            put("jam","audio/x-jam");
            put("jav","text/plain");
            put("jav","text/x-java-source");
            put("java","text/plain");
            put("java","text/x-java-source");
            put("jcm","application/x-java-commerce");
            put("jfif","image/jpeg");
            put("jfif","image/pjpeg");
            put("jfif-tbnl","image/jpeg");
            put("jpe","image/jpeg");
            put("jpe","image/pjpeg");
            put("jpeg","image/jpeg");
            put("jpeg","image/pjpeg");
            put("jpg","image/jpeg");
            put("jpg","image/pjpeg");
            put("jps","image/x-jps");
            put("js","application/x-javascript");
            put("js","application/javascript");
            put("js","application/ecmascript");
            put("js","text/javascript");
            put("js","text/ecmascript");
            put("jut","image/jutvision");
            put("kar","audio/midi");
            put("kar","music/x-karaoke");
            put("ksh","application/x-ksh");
            put("ksh","text/x-script.ksh");
            put("la","audio/nspaudio");
            put("la","audio/x-nspaudio");
            put("lam","audio/x-liveaudio");
            put("latex","application/x-latex");
            put("lha","application/lha");
            put("lha","application/octet-stream");
            put("lha","application/x-lha");
            put("lhx","application/octet-stream");
            put("list","text/plain");
            put("lma","audio/nspaudio");
            put("lma","audio/x-nspaudio");
            put("log","text/plain");
            put("lsp","application/x-lisp");
            put("lsp","text/x-script.lisp");
            put("lst","text/plain");
            put("lsx","text/x-la-asf");
            put("ltx","application/x-latex");
            put("lzh","application/octet-stream");
            put("lzh","application/x-lzh");
            put("lzx","application/lzx");
            put("lzx","application/octet-stream");
            put("lzx","application/x-lzx");
            put("m","text/plain");
            put("m","text/x-m");
            put("m1v","video/mpeg");
            put("m2a","audio/mpeg");
            put("m2v","video/mpeg");
            put("m3u","audio/x-mpequrl");
            put("man","application/x-troff-man");
            put("map","application/x-navimap");
            put("mar","text/plain");
            put("mbd","application/mbedlet");
            put("mc$","application/x-magic-cap-package-1.0");
            put("mcd","application/mcad");
            put("mcd","application/x-mathcad");
            put("mcf","image/vasa");
            put("mcf","text/mcf");
            put("mcp","application/netmc");
            put("me","application/x-troff-me");
            put("mht","message/rfc822");
            put("mhtml","message/rfc822");
            put("mid","application/x-midi");
            put("mid","audio/midi");
            put("mid","audio/x-mid");
            put("mid","audio/x-midi");
            put("mid","music/crescendo");
            put("mid","x-music/x-midi");
            put("midi","application/x-midi");
            put("midi","audio/midi");
            put("midi","audio/x-mid");
            put("midi","audio/x-midi");
            put("midi","music/crescendo");
            put("midi","x-music/x-midi");
            put("mif","application/x-frame");
            put("mif","application/x-mif");
            put("mime","message/rfc822");
            put("mime","www/mime");
            put("mjf","audio/x-vnd.audioexplosion.mjuicemediafile");
            put("mjpg","video/x-motion-jpeg");
            put("mm","application/base64");
            put("mm","application/x-meme");
            put("mme","application/base64");
            put("mod","audio/mod");
            put("mod","audio/x-mod");
            put("moov","video/quicktime");
            put("mov","video/quicktime");
            put("movie","video/x-sgi-movie");
            put("mp2","audio/mpeg");
            put("mp2","audio/x-mpeg");
            put("mp2","video/mpeg");
            put("mp2","video/x-mpeg");
            put("mp2","video/x-mpeq2a");
            put("mp3","audio/mpeg3");
            put("mp3","audio/x-mpeg-3");
            put("mp3","video/mpeg");
            put("mp3","video/x-mpeg");
            put("mpa","audio/mpeg");
            put("mpa","video/mpeg");
            put("mpc","application/x-project");
            put("mpe","video/mpeg");
            put("mpeg","video/mpeg");
            put("mpg","audio/mpeg");
            put("mpg","video/mpeg");
            put("mpga","audio/mpeg");
            put("mpp","application/vnd.ms-project");
            put("mpt","application/x-project");
            put("mpv","application/x-project");
            put("mpx","application/x-project");
            put("mrc","application/marc");
            put("ms","application/x-troff-ms");
            put("mv","video/x-sgi-movie");
            put("my","audio/make");
            put("mzz","application/x-vnd.audioexplosion.mzz");
            put("nap","image/naplps");
            put("naplps","image/naplps");
            put("nc","application/x-netcdf");
            put("ncm","application/vnd.nokia.configuration-message");
            put("nif","image/x-niff");
            put("niff","image/x-niff");
            put("nix","application/x-mix-transfer");
            put("nsc","application/x-conference");
            put("nvd","application/x-navidoc");
            put("o","application/octet-stream");
            put("oda","application/oda");
            put("omc","application/x-omc");
            put("omcd","application/x-omcdatamaker");
            put("omcr","application/x-omcregerator");
            put("p","text/x-pascal");
            put("p10","application/pkcs10");
            put("p10","application/x-pkcs10");
            put("p12","application/pkcs-12");
            put("p12","application/x-pkcs12");
            put("p7a","application/x-pkcs7-signature");
            put("p7c","application/pkcs7-mime");
            put("p7c","application/x-pkcs7-mime");
            put("p7m","application/pkcs7-mime");
            put("p7m","application/x-pkcs7-mime");
            put("p7r","application/x-pkcs7-certreqresp");
            put("p7s","application/pkcs7-signature");
            put("part","application/pro_eng");
            put("pas","text/pascal");
            put("pbm","image/x-portable-bitmap");
            put("pcl","application/vnd.hp-pcl");
            put("pcl","application/x-pcl");
            put("pct","image/x-pict");
            put("pcx","image/x-pcx");
            put("pdb","chemical/x-pdb");
            put("pdf","application/pdf");
            put("pfunk","audio/make");
            put("pfunk","audio/make.my.funk");
            put("pgm","image/x-portable-graymap");
            put("pgm","image/x-portable-greymap");
            put("pic","image/pict");
            put("pict","image/pict");
            put("pkg","application/x-newton-compatible-pkg");
            put("pko","application/vnd.ms-pki.pko");
            put("pl","text/plain");
            put("pl","text/x-script.perl");
            put("plx","application/x-pixclscript");
            put("pm","image/x-xpixmap");
            put("pm","text/x-script.perl-module");
            put("pm4","application/x-pagemaker");
            put("pm5","application/x-pagemaker");
            put("png","image/png");
            put("pnm","application/x-portable-anymap");
            put("pnm","image/x-portable-anymap");
            put("pot","application/mspowerpoint");
            put("pot","application/vnd.ms-powerpoint");
            put("pov","model/x-pov");
            put("ppa","application/vnd.ms-powerpoint");
            put("ppm","image/x-portable-pixmap");
            put("pps","application/mspowerpoint");
            put("pps","application/vnd.ms-powerpoint");
            put("ppt","application/mspowerpoint");
            put("ppt","application/powerpoint");
            put("ppt","application/vnd.ms-powerpoint");
            put("ppt","application/x-mspowerpoint");
            put("ppz","application/mspowerpoint");
            put("pre","application/x-freelance");
            put("prt","application/pro_eng");
            put("ps","application/postscript");
            put("psd","application/octet-stream");
            put("pvu","paleovu/x-pv");
            put("pwz","application/vnd.ms-powerpoint");
            put("py","text/x-script.phyton");
            put("pyc","application/x-bytecode.python");
            put("qcp","audio/vnd.qcelp");
            put("qd3","x-world/x-3dmf");
            put("qd3d","x-world/x-3dmf");
            put("qif","image/x-quicktime");
            put("qt","video/quicktime");
            put("qtc","video/x-qtc");
            put("qti","image/x-quicktime");
            put("qtif","image/x-quicktime");
            put("ra","audio/x-pn-realaudio");
            put("ra","audio/x-pn-realaudio-plugin");
            put("ra","audio/x-realaudio");
            put("ram","audio/x-pn-realaudio");
            put("ras","application/x-cmu-raster");
            put("ras","image/cmu-raster");
            put("ras","image/x-cmu-raster");
            put("rast","image/cmu-raster");
            put("rexx","text/x-script.rexx");
            put("rf","image/vnd.rn-realflash");
            put("rgb","image/x-rgb");
            put("rm","application/vnd.rn-realmedia");
            put("rm","audio/x-pn-realaudio");
            put("rmi","audio/mid");
            put("rmm","audio/x-pn-realaudio");
            put("rmp","audio/x-pn-realaudio");
            put("rmp","audio/x-pn-realaudio-plugin");
            put("rng","application/ringing-tones");
            put("rng","application/vnd.nokia.ringing-tone");
            put("rnx","application/vnd.rn-realplayer");
            put("roff","application/x-troff");
            put("rp","image/vnd.rn-realpix");
            put("rpm","audio/x-pn-realaudio-plugin");
            put("rt","text/richtext");
            put("rt","text/vnd.rn-realtext");
            put("rtf","application/rtf");
            put("rtf","application/x-rtf");
            put("rtf","text/richtext");
            put("rtx","application/rtf");
            put("rtx","text/richtext");
            put("rv","video/vnd.rn-realvideo");
            put("s","text/x-asm");
            put("s3m","audio/s3m");
            put("saveme","application/octet-stream");
            put("sbk","application/x-tbook");
            put("scm","application/x-lotusscreencam");
            put("scm","text/x-script.guile");
            put("scm","text/x-script.scheme");
            put("scm","video/x-scm");
            put("sdml","text/plain");
            put("sdp","application/sdp");
            put("sdp","application/x-sdp");
            put("sdr","application/sounder");
            put("sea","application/sea");
            put("sea","application/x-sea");
            put("set","application/set");
            put("sgm","text/sgml");
            put("sgm","text/x-sgml");
            put("sgml","text/sgml");
            put("sgml","text/x-sgml");
            put("sh","application/x-bsh");
            put("sh","application/x-sh");
            put("sh","application/x-shar");
            put("sh","text/x-script.sh");
            put("shar","application/x-bsh");
            put("shar","application/x-shar");
            put("shtml","text/html");
            put("shtml","text/x-server-parsed-html");
            put("sid","audio/x-psid");
            put("sit","application/x-sit");
            put("sit","application/x-stuffit");
            put("skd","application/x-koan");
            put("skm","application/x-koan");
            put("skp","application/x-koan");
            put("skt","application/x-koan");
            put("sl","application/x-seelogo");
            put("smi","application/smil");
            put("smil","application/smil");
            put("snd","audio/basic");
            put("snd","audio/x-adpcm");
            put("sol","application/solids");
            put("spc","application/x-pkcs7-certificates");
            put("spc","text/x-speech");
            put("spl","application/futuresplash");
            put("spr","application/x-sprite");
            put("sprite","application/x-sprite");
            put("src","application/x-wais-source");
            put("ssi","text/x-server-parsed-html");
            put("ssm","application/streamingmedia");
            put("sst","application/vnd.ms-pki.certstore");
            put("step","application/step");
            put("stl","application/sla");
            put("stl","application/vnd.ms-pki.stl");
            put("stl","application/x-navistyle");
            put("stp","application/step");
            put("sv4cpio","application/x-sv4cpio");
            put("sv4crc","application/x-sv4crc");
            put("svf","image/vnd.dwg");
            put("svf","image/x-dwg");
            put("svr","application/x-world");
            put("svr","x-world/x-svr");
            put("swf","application/x-shockwave-flash");
            put("t","application/x-troff");
            put("talk","text/x-speech");
            put("tar","application/x-tar");
            put("tbk","application/toolbook");
            put("tbk","application/x-tbook");
            put("tcl","application/x-tcl");
            put("tcl","text/x-script.tcl");
            put("tcsh","text/x-script.tcsh");
            put("tex","application/x-tex");
            put("texi","application/x-texinfo");
            put("texinfo","application/x-texinfo");
            put("text","application/plain");
            put("text","text/plain");
            put("tgz","application/gnutar");
            put("tgz","application/x-compressed");
            put("tif","image/tiff");
            put("tif","image/x-tiff");
            put("tiff","image/tiff");
            put("tiff","image/x-tiff");
            put("tr","application/x-troff");
            put("tsi","audio/tsp-audio");
            put("tsp","application/dsptype");
            put("tsp","audio/tsplayer");
            put("tsv","text/tab-separated-values");
            put("turbot","image/florian");
            put("txt","text/plain");
            put("uil","text/x-uil");
            put("uni","text/uri-list");
            put("unis","text/uri-list");
            put("unv","application/i-deas");
            put("uri","text/uri-list");
            put("uris","text/uri-list");
            put("ustar","application/x-ustar");
            put("ustar","multipart/x-ustar");
            put("uu","application/octet-stream");
            put("uu","text/x-uuencode");
            put("uue","text/x-uuencode");
            put("vcd","application/x-cdlink");
            put("vcs","text/x-vcalendar");
            put("vda","application/vda");
            put("vdo","video/vdo");
            put("vew","application/groupwise");
            put("viv","video/vivo");
            put("viv","video/vnd.vivo");
            put("vivo","video/vivo");
            put("vivo","video/vnd.vivo");
            put("vmd","application/vocaltec-media-desc");
            put("vmf","application/vocaltec-media-file");
            put("voc","audio/voc");
            put("voc","audio/x-voc");
            put("vos","video/vosaic");
            put("vox","audio/voxware");
            put("vqe","audio/x-twinvq-plugin");
            put("vqf","audio/x-twinvq");
            put("vql","audio/x-twinvq-plugin");
            put("vrml","application/x-vrml");
            put("vrml","model/vrml");
            put("vrml","x-world/x-vrml");
            put("vrt","x-world/x-vrt");
            put("vsd","application/x-visio");
            put("vst","application/x-visio");
            put("vsw","application/x-visio");
            put("w60","application/wordperfect6.0");
            put("w61","application/wordperfect6.1");
            put("w6w","application/msword");
            put("wav","audio/wav");
            put("wav","audio/x-wav");
            put("wb1","application/x-qpro");
            put("wbmp","image/vnd.wap.wbmp");
            put("web","application/vnd.xara");
            put("wiz","application/msword");
            put("wk1","application/x-123");
            put("wmf","windows/metafile");
            put("wml","text/vnd.wap.wml");
            put("wmlc","application/vnd.wap.wmlc");
            put("wmls","text/vnd.wap.wmlscript");
            put("wmlsc","application/vnd.wap.wmlscriptc");
            put("word","application/msword");
            put("wp","application/wordperfect");
            put("wp5","application/wordperfect");
            put("wp5","application/wordperfect6.0");
            put("wp6","application/wordperfect");
            put("wpd","application/wordperfect");
            put("wpd","application/x-wpwin");
            put("wq1","application/x-lotus");
            put("wri","application/mswrite");
            put("wri","application/x-wri");
            put("wrl","application/x-world");
            put("wrl","model/vrml");
            put("wrl","x-world/x-vrml");
            put("wrz","model/vrml");
            put("wrz","x-world/x-vrml");
            put("wsc","text/scriplet");
            put("wsrc","application/x-wais-source");
            put("wtk","application/x-wintalk");
            put("xbm","image/x-xbitmap");
            put("xbm","image/x-xbm");
            put("xbm","image/xbm");
            put("xdr","video/x-amt-demorun");
            put("xgz","xgl/drawing");
            put("xif","image/vnd.xiff");
            put("xl","application/excel");
            put("xla","application/excel");
            put("xla","application/x-excel");
            put("xla","application/x-msexcel");
            put("xlb","application/excel");
            put("xlb","application/vnd.ms-excel");
            put("xlb","application/x-excel");
            put("xlc","application/excel");
            put("xlc","application/vnd.ms-excel");
            put("xlc","application/x-excel");
            put("xld","application/excel");
            put("xld","application/x-excel");
            put("xlk","application/excel");
            put("xlk","application/x-excel");
            put("xll","application/excel");
            put("xll","application/vnd.ms-excel");
            put("xll","application/x-excel");
            put("xlm","application/excel");
            put("xlm","application/vnd.ms-excel");
            put("xlm","application/x-excel");
            put("xls","application/excel");
            put("xls","application/vnd.ms-excel");
            put("xls","application/x-excel");
            put("xls","application/x-msexcel");
            put("xlt","application/excel");
            put("xlt","application/x-excel");
            put("xlv","application/excel");
            put("xlv","application/x-excel");
            put("xlw","application/excel");
            put("xlw","application/vnd.ms-excel");
            put("xlw","application/x-excel");
            put("xlw","application/x-msexcel");
            put("xm","audio/xm");
            put("xml","application/xml");
            put("xml","text/xml");
            put("xmz","xgl/movie");
            put("xpix","application/x-vnd.ls-xpix");
            put("xpm","image/x-xpixmap");
            put("xpm","image/xpm");
            put("x-png","image/png");
            put("xsr","video/x-amt-showrun");
            put("xwd","image/x-xwd");
            put("xwd","image/x-xwindowdump");
            put("xyz","chemical/x-pdb");
            put("z","application/x-compress");
            put("z","application/x-compressed");
            put("zip","application/x-compressed");
            put("zip","application/x-zip-compressed");
            put("zip","application/zip");
            put("zip","multipart/x-zip");
            put("zoo","application/octet-stream");
            put("zsh","text/x-script.zsh");
        }};
        private final String name;

        public MimeType(String name) {
            this.name = name;
        }

        public String get() {
            return mimeTypes.get(new FileExtension(name).get());
        }
    }

    private final class FileExtension {
        private final String fileName;

        public FileExtension(String fileName) {
            this.fileName = fileName;
        }

        public String get() {
            int extensionIndex = fileName.lastIndexOf('.');
            return extensionIndex == 0 ? fileName : fileName.substring(extensionIndex + 1);
        }
    }
}
