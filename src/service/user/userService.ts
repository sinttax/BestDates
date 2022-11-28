import { ValidationError } from 'joi';
import { UserRepository } from '../../repository/userRepository';
import { UserEntity } from '../../db/entity/userEntity';
import { userSchema } from './userSchema';

export class UserService {
  constructor(public userRepository: UserRepository) {}

  async listUsers(myId: number): Promise<UserEntity[]> {
    return this.userRepository.listUsers(myId);
  }

  async createUser(
    user: UserEntity,
    photo: string
  ): Promise<{ status: string; message: string[] }> {
    try {
      await userSchema.validateAsync(user);
    } catch (error) {
      if (error instanceof ValidationError) {
        const { details } = error;
        const errorMessage = details.map((ve) => ve.message);
        return { status: 'Error', message: errorMessage };
      }
    }

    const newUser = await this.userRepository.createUser(user, photo);

    return {
      status: 'OK',
      message: [`User is succesfully saved with userID: ${newUser.user_id}`],
    };
  }

  async findUserByUserEmail(userEmail: string): Promise<UserEntity | null> {
    return await this.userRepository.findUserByUserEmail(userEmail);
  }

  async findUserById(userId: number): Promise<UserEntity | null> {
    const user = await this.userRepository.findUserById(userId);
    return user;
  }

  async findOwnProfile(userId: number): Promise<UserEntity | null> {
    const user = await this.userRepository.findOwnProfile(userId);
    return user;
  }
}
