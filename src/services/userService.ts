import User, { IUser } from '../models/user';
import { UserDTO } from '../dto/userDto';

class UserService {
  public async createUser(userDTO: UserDTO): Promise<IUser> {
    const user = new User(userDTO);
    return user.save();
  }
}

export default new UserService();
