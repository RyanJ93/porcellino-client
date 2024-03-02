import SecurityContextHolder from '../suppport/SecurityContextHolder';
import AuthenticatedUser from '../entities/AuthenticatedUser';
import SecurityContext from '../suppport/SecurityContext';
import APIEndpoints from '../enum/APIEndpoints';
import Request from '../facades/Request';
import Service from './Service';

class AuthenticationService extends Service {
    public async authenticate(email: string, password: string, rememberMe: boolean = true): Promise<void> {
        const data = { password: password, email: email };
        const response = await Request.post(APIEndpoints.AUTHENTICATION_LOGIN, data, false);
        const securityContext: SecurityContext = SecurityContextHolder.getContext();
        const authenticatedUser = new AuthenticatedUser(email, response.token);
        securityContext.setAuthenticatedUser(authenticatedUser);
        if ( rememberMe ){
            securityContext.persist();
        }
    }
}

export default AuthenticationService;
