class AuthenticatedUser {
    private readonly email: string;
    private readonly token: string;

    public constructor(email: string, token: string){
        this.email = email;
        this.token = token;
    }

    public getEmail(): string {
        return this.email;
    }

    public getToken(): string {
        return this.token;
    }
}

export default AuthenticatedUser;
