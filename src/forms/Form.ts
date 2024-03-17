interface Form<T> {
    isValid(fields: T): boolean;
}

export default Form;
