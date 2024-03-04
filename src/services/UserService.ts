import AuthenticationService from './AuthenticationService';
import APIEndpoints from '../enum/APIEndpoints';
import Request from '../facades/Request';
import User from '../entities/User';
import Service from './Service';

type UserSignupRequestPayload = {
    password: string,
    email: string
};

class UserService extends Service {
    public async signup(email: string, password: string): Promise<void> {
        const data: UserSignupRequestPayload = { password: password, email: email };
        const response = await Request.post(APIEndpoints.USER_SIGNUP, data, false);
        new AuthenticationService().setAuthenticatedUser(new User(response.user), response.token, true);
    }
}

export default UserService;
