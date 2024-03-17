import APIResponseMapper from './APIResponseMapper';
import User from '../User';

class UserMapper implements APIResponseMapper {
    public makeListFromAPIResponse(responseData: any): User[] {
        return responseData.userList.map((userData: any): User => {
            return this.makeFromAPIResponse({ user: userData });
        });
    }

    public makeFromAPIResponse(responseData: any): User {
        return new User(responseData.user);
    }
}

export default UserMapper;
