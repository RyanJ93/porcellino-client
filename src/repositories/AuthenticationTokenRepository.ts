import Repository from './Repository';

class AuthenticationTokenRepository implements Repository {
    public store(token: string, sessionOnly: boolean = true): void {
        if ( sessionOnly ){
            return window.sessionStorage.setItem('AUTH_TOKEN', token);
        }
        window.localStorage.setItem('AUTH_TOKEN', token);
    }

    public get(): string | null {
        let token: string | null = window.sessionStorage.getItem('AUTH_TOKEN');
        if ( token === null || token === '' ){
            token = window.localStorage.getItem('AUTH_TOKEN');
        }
        return token;
    }

    public drop(): void {
        window.sessionStorage.removeItem('AUTH_TOKEN');
        window.localStorage.removeItem('AUTH_TOKEN');
    }
}

export default AuthenticationTokenRepository;
