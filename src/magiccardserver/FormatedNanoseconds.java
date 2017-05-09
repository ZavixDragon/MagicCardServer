package magiccardserver;

public class FormatedNanoseconds {
    private final long nanoseconds;

    public FormatedNanoseconds(long nanoseconds) {
        this.nanoseconds = nanoseconds;
    }

    public String get() {
        String result = "";
        int hours = (int)(nanoseconds / 3600000000000L);
        if (hours > 0)
            result += " Hours: " + hours;
        int minutes = (int)(nanoseconds / 60000000000L) % 60;
        if (minutes > 0)
            result += " Minutes: " + minutes;
        int seconds = (int)(nanoseconds / 1000000000) % 60;
        if (seconds > 0)
            result += " Seconds: " + seconds;
        int millis = (int)(nanoseconds / 1000000) % 1000;
        if (millis > 0)
            result += " Milliseconds: " + millis;
        int nanos = (int)nanoseconds % 10000000;
        if (nanos > 0)
            result += " Nanoseconds: " + nanos;
        return result;
    }
}
