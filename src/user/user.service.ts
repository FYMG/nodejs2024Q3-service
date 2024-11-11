import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import User from './models/User';
import CreateUserDto from './models/dto/CreateUserDto';
import { v4 as uuidv4 } from 'uuid';
import UpdatePasswordDto from './models/dto/UpdatePasswordDto';
import { t } from '../shared/loc';
import removeObjectKey from '../shared/helpers/removeObjectKey';
import { UserResponseType } from './models/responses/UserResponse';

@Injectable()
export class UserService {
  private users: User[] = [];

  findAll(): UserResponseType[] {
    return this.users.map((user) => {
      return removeObjectKey(user, ['password']);
    });
  }

  findById(id: string): UserResponseType {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(t('user-not-found'));
    return removeObjectKey(user, ['password']);
  }

  create(createUserDto: CreateUserDto): UserResponseType {
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    // if (this.users.find((user) => user.login === newUser.login)) {
    //   throw new ForbiddenException(t('user-already-exists'));
    // }

    this.users.push(newUser);

    return removeObjectKey(newUser, ['password']);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): UserResponseType {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(t('user-not-found'));

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException(t('old-password-is-incorrect'));
    }

    user.password = updatePasswordDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return removeObjectKey(user, ['password']);
  }

  delete(id: string): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException(t('user-not-found'));
    this.users.splice(index, 1);
  }
}
