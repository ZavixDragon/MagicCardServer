package magiccardserver;

import java.util.function.Supplier;

public class PerformanceCheckedSupplier<T> {
    private final Supplier<T> supplier;
    private final String name;

    public PerformanceCheckedSupplier(Supplier<T> supplier, String name) {
        this.supplier = supplier;
        this.name = name;
    }

    public T get() {
        long startTime = System.nanoTime();
        T result = supplier.get();
        long endTime = System.nanoTime();
        System.out.println(name + ": " + new FormatedNanoseconds(endTime - startTime).get());
        return result;
    }
}
