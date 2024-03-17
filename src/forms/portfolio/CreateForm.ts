import ErrorsAwareForm from '../ErrorsAwareForm';
import Form from '../Form';

class CreateForm implements Form<PortfolioCreateFormFields>, ErrorsAwareForm<PortfolioCreateFormErrors> {
    private errors: PortfolioCreateFormErrors = {};

    public getErrors(): PortfolioCreateFormErrors {
        return this.errors;
    }

    public isValid(fields: PortfolioCreateFormFields): boolean {
        let isFormValid: boolean = true;
        this.errors = {};
        if ( fields.name.length === 0 || fields.name.length > 50 ){
            this.errors.name = 'Invalid name.';
            isFormValid = false;
        }
        if ( isNaN(fields.currencyId) || fields.currencyId <= 0 ){
            this.errors.currency = 'Invalid currency.';
            isFormValid = false;
        }
        return isFormValid;
    }
}

export default CreateForm;
