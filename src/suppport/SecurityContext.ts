import AuthenticationContract from '../DTOs/AuthenticationContract';

class SecurityContext {
    private authenticationContract?: AuthenticationContract;

    public setAuthenticatedUser(authenticationContract?: AuthenticationContract): this {
        this.authenticationContract = authenticationContract;
        return this;
    }

    public getAuthenticationContract(): AuthenticationContract | undefined {
        return this.authenticationContract;
    }

    public persist(): this {

        return this;
    }
}

export default SecurityContext;
