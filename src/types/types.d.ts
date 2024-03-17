declare global {
    type PortfolioCreateFormErrors = {
        globalError?: string,
        currency?: string,
        name?: string
    };

    type PortfolioCreateFormFields = {
        currencyId: number,
        name: string
    };

    type PortfolioEditFormErrors = {
        globalError?: string,
        name?: string
    };

    type PortfolioEditFormFields = {
        name: string
    };

    type SignupFormErrors = {
        passwordConfirm?: string,
        globalError?: string,
        password?: string,
        email?: string
    };

    type LoginFormErrors = {
        globalError?: string,
        password?: string,
        email?: string
    };
}

export {};
