import User from '../entities/User';

class AuthenticationContract {
    private readonly token: string;
    private readonly user: User;

    public constructor(user: User, token: string){
        this.token = token;
        this.user = user;
    }

    public getToken(): string {
        return this.token;
    }

    public getUser(): User {
        return this.user;
    }
}

export default AuthenticationContract;
