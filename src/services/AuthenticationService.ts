import SecurityContextHolder from '../suppport/SecurityContextHolder';
import AuthenticationContract from '../DTOs/AuthenticationContract';
import SecurityContext from '../suppport/SecurityContext';
import APIEndpoints from '../enum/APIEndpoints';
import Request from '../facades/Request';
import User from '../entities/User';
import Service from './Service';

class AuthenticationService extends Service {
    public async authenticate(email: string, password: string, rememberMe: boolean = true): Promise<void> {
        const data = { password: password, email: email };
        const response = await Request.post(APIEndpoints.AUTHENTICATION_LOGIN, data, false);
        const user = new User(response.user);
        const authenticationContract = new AuthenticationContract(user, response.token);
        const securityContext: SecurityContext = SecurityContextHolder.getContext();
        securityContext.setAuthenticatedUser(authenticationContract);
        if ( rememberMe ){
            securityContext.persist();
        }
    }
}

export default AuthenticationService;
