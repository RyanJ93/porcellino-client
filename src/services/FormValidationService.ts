import Form from '../forms/Form';
import Service from './Service';

class FormValidationService<T> extends Service {
    private form: Form<T>;

    public constructor(form: Form<T>){
        super();

        this.form = form;
    }

    public isValid(fields: T): boolean {
        return this.form.isValid(fields);
    }
}

export default FormValidationService;
