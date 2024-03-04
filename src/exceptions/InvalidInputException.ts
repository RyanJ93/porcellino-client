import ErrorMessageBag from '../DTOs/ErrorMessageBag';
import Exception from './Exception';

class InvalidInputException extends Exception {
    private errorMessageBag?: ErrorMessageBag;

    public extractHTTPResponseProperties(response: any){
        this.setErrorMessageBag(ErrorMessageBag.makeFromHTTPResponse(response));
    }

    public setErrorMessageBag(errorMessageBag: ErrorMessageBag): this {
        this.errorMessageBag = errorMessageBag;
        return this;
    }

    getErrorMessageBag(): ErrorMessageBag | undefined {
        return this.errorMessageBag;
    }
}

export default InvalidInputException;
