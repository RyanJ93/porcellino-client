import SecurityContextHolder from '../suppport/SecurityContextHolder';
import AuthenticationContract from '../DTOs/AuthenticationContract';
import SecurityContext from '../suppport/SecurityContext';
import APIEndpoints from '../enum/APIEndpoints';
import Request from '../facades/Request';
import User from '../entities/User';
import Service from './Service';

type UserAuthenticationRequestPayload = {
    password: string,
    email: string
};

class AuthenticationService extends Service {
    public setAuthenticatedUser(user: User, token: string, rememberMe: boolean = true): this {
        const securityContext: SecurityContext = SecurityContextHolder.getContext();
        securityContext.setAuthenticatedUser(new AuthenticationContract(user, token));
        if ( rememberMe ){
            securityContext.persist();
        }
        return this;
    }

    public async authenticate(email: string, password: string, rememberMe: boolean = true): Promise<void> {
        const data: UserAuthenticationRequestPayload = { password: password, email: email };
        const response: any = await Request.post(APIEndpoints.AUTHENTICATION_LOGIN, data, false);
        this.setAuthenticatedUser(new User(response.user), response.token, rememberMe);
    }
}

export default AuthenticationService;
