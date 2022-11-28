import { applicationDataSource } from '../db/index';
import { genSaltSync, hashSync } from 'bcrypt';
import { UserEntity } from '../db/entity/userEntity';
import { Not, NotBrackets } from 'typeorm';

export interface IUserRepository {
  listUsers(myId: number): Promise<UserEntity[]>;
  createUser(user: UserEntity, photo: string): Promise<UserEntity>;
}

export class UserRepository implements IUserRepository {
  async listUsers(myId: number): Promise<UserEntity[]> {
    return applicationDataSource.getRepository(UserEntity).findBy({
      user_id: Not(myId),
    });
  }

  toCapitalCase = (s: string | undefined): string => {
    let cap = s!
      .split(' ')
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1).toLocaleLowerCase();
      })
      .join(' ');

    return cap;
  };

  async createUser(user: UserEntity, photo: string): Promise<UserEntity> {
    const newUser = new UserEntity();

    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    const hash = hashSync(user.user_password!, salt);

    newUser.user_name = this.toCapitalCase(user.user_name);
    newUser.user_password = hash;
    newUser.user_email = user.user_email;
    newUser.age = user.age;
    newUser.height = user.height;
    newUser.weight = user.weight;
    newUser.eye_color = user.eye_color;
    newUser.country = user.country;
    newUser.additional_info = user.additional_info;
    newUser.gender = user.gender;
    newUser.photo_path = photo;

    return applicationDataSource.getRepository(UserEntity).save(newUser);
  }

  async findUserById(id: number): Promise<UserEntity | null> {
    return applicationDataSource
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .select([
        'user.user_name',
        'user.age',
        'user.gender',
        'user.height',
        'user.weight',
        'user.eye_color',
        'user.country',
        'user.additional_info',
        'user.photo_path',
      ])
      .where('user.user_id = :user_id', { user_id: id })
      .getOne();
  }

  async findOwnProfile(id: number): Promise<UserEntity | null> {
    return applicationDataSource
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.user_id = :user_id', { user_id: id })
      .getOne();
  }

  async findUserByUserEmail(userEmail: string): Promise<UserEntity | null> {
    return applicationDataSource
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .select(['user.user_id', 'user.user_password'])
      .where('user.user_email=:user_email', {
        user_email: userEmail,
      })
      .getOne();
  }
}
