import AuthenticationTokenRepository from '../repositories/AuthenticationTokenRepository';
import SecurityContextHolder from '../suppport/SecurityContextHolder';
import AuthenticationContract from '../DTOs/AuthenticationContract';
import SecurityContext from '../suppport/SecurityContext';
import UserMapper from '../entities/mappers/UserMapper';
import APIEndpoints from '../enum/APIEndpoints';
import Request from '../facades/Request';
import User from '../entities/User';
import Service from './Service';

type UserAuthenticationRequestPayload = {
    password: string,
    email: string
};

class AuthenticationService extends Service {
    private readonly authenticationTokenRepository: AuthenticationTokenRepository;

    private finalizeAuthentication(user: User, token: string): void {
        const securityContext: SecurityContext = SecurityContextHolder.getContext();
        securityContext.setAuthenticatedUser(new AuthenticationContract(user, token));
        this.setupRenewCron(token);
    }

    private async fetchUserInfo(token: string): Promise<User> {
        const response: any = await Request.get(APIEndpoints.USER_INFO, null, { accessToken: token });
        return new UserMapper().makeFromAPIResponse(response);
    }

    private setupRenewCron(token: string): void {
        const jwtPayload: any = JSON.parse(window.atob(token.split('.')[1]));
        let timeout: number = jwtPayload.exp - new Date().getTime() - 600;
        if ( timeout <= 0 ){
            timeout = 1;
        }
        window.setTimeout(() => this.renew(), timeout);
    }

    public constructor(){
        super();

        this.authenticationTokenRepository = new AuthenticationTokenRepository();
    }

    public async checkAuthenticationStatus(): Promise<boolean> {
        try{
            const token: string | null = this.authenticationTokenRepository.get();
            if ( token === null || token === '' ){
                return false;
            }
            const user: User = await this.fetchUserInfo(token);
            this.finalizeAuthentication(user, token);
            return true;
        }catch(ex){
            console.error(ex);
            this.logout();
            return false;
        }
    }

    public setAuthenticatedUser(user: User, token: string, rememberMe: boolean = true): void {
        this.authenticationTokenRepository.store(token, !rememberMe);
        this.finalizeAuthentication(user, token);
    }

    public async authenticate(email: string, password: string, rememberMe: boolean = true): Promise<void> {
        const data: UserAuthenticationRequestPayload = { password: password, email: email };
        const response: any = await Request.post(APIEndpoints.AUTHENTICATION_LOGIN, data, { authenticated: false });
        const user: User = new UserMapper().makeFromAPIResponse(response);
        this.setAuthenticatedUser(user, response.token, rememberMe);
    }

    public async renew(): Promise<void> {
        const contract: AuthenticationContract | undefined = SecurityContextHolder.getContext().getAuthenticationContract();
        if ( typeof contract !== 'undefined' ){
            const response: any = await Request.get(APIEndpoints.AUTHENTICATION_RENEW);
            this.finalizeAuthentication(contract.getUser(), response.token);
        }
    }

    public logout(): void {
        const securityContext: SecurityContext = SecurityContextHolder.getContext();
        securityContext.setAuthenticatedUser(undefined);
        this.authenticationTokenRepository.drop();
    }
}

export default AuthenticationService;
