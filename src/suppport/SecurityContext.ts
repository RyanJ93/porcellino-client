import AuthenticatedUser from '../entities/AuthenticatedUser';

class SecurityContext {
    private authenticatedUser?: AuthenticatedUser;

    public setAuthenticatedUser(authenticatedUser?: AuthenticatedUser): this {
        this.authenticatedUser = authenticatedUser;
        return this;
    }

    public getAuthenticatedUser(): AuthenticatedUser | undefined {
        return this.authenticatedUser;
    }

    public persist(): this {

        return this;
    }
}

export default SecurityContext;
