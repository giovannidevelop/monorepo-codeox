package cl.subox.ms.producto.domain.exeptions;

public class NoDataFoundException extends RuntimeException {

    public NoDataFoundException() {
        super("No data found");
    }
}