package magiccardserver;

import java.time.Duration;

public class PerformanceCheckedAction {
    private final Runnable action;
    private final String name;

    public PerformanceCheckedAction(Runnable action, String name) {
        this.action = action;
        this.name = name;
    }

    public void run() {
        long startTime = System.nanoTime();
        action.run();
        long endTime = System.nanoTime();
        System.out.println(name + ": " + new FormatedNanoseconds(endTime - startTime).get());
    }
}
