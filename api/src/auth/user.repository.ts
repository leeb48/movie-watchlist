import { EntityRepository, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async registerUser(createUserDto: CreateUserDto): Promise<string> {
    const { username, firstName, lastName, password } = createUserDto;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User();
    newUser.username = username;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = hash;
    newUser.salt = salt;

    await newUser.save();

    return newUser.username;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.findOne({ username });

    return user;
  }
}
