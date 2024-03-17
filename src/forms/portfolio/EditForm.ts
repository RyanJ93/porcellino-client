import ErrorsAwareForm from '../ErrorsAwareForm';
import Form from '../Form';

class EditForm implements Form<PortfolioEditFormFields>, ErrorsAwareForm<PortfolioEditFormErrors> {
    private errors: PortfolioEditFormErrors = {};

    public getErrors(): PortfolioEditFormErrors {
        return this.errors;
    }

    public isValid(fields: PortfolioEditFormFields): boolean {
        let isFormValid: boolean = true;
        this.errors = {};
        if ( fields.name.length === 0 || fields.name.length > 50 ){
            this.errors.name = 'Invalid name.';
            isFormValid = false;
        }
        return isFormValid;
    }
}

export default EditForm;
