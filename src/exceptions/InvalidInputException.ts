import ErrorMessageBag from '../DTOs/ErrorMessageBag';
import Exception from './Exception';

class InvalidInputException extends Exception {
    private errorMessageBag?: ErrorMessageBag;

    public extractHTTPResponseProperties(response: any){
        this.setErrorMessageBag(ErrorMessageBag.makeFromHTTPResponse(response));
    }

    public setErrorMessageBag(errorMessageBag: ErrorMessageBag): void {
        this.errorMessageBag = errorMessageBag;
    }

    getErrorMessageBag(): ErrorMessageBag | undefined {
        return this.errorMessageBag;
    }

    hasErrorMessageBag(): boolean {
        return this.errorMessageBag instanceof ErrorMessageBag;
    }
}

export default InvalidInputException;
