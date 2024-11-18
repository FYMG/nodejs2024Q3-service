import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import CreateUserDto from './models/dto/CreateUserDto';
import UpdatePasswordDto from './models/dto/UpdatePasswordDto';
import { t } from '../shared/loc';
import removeObjectKey from '../shared/helpers/removeObjectKey';
import { UserResponseType } from './models/responses/UserResponse';
import User from './models/User';
import { PrismaService } from '../core/services/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserResponseType[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.prepareUserForResponse(user));
  }

  async findById(id: string): Promise<UserResponseType> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.prepareUserForResponse(user);
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseType> {
    const user = await this.prisma.user.create({
      data: {
        login: createUserDto.login,
        password: createUserDto.password,
      },
    });

    return this.prepareUserForResponse(user);
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResponseType> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(t('user-not-found'));

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException(t('old-password-is-incorrect'));
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: updatePasswordDto.newPassword,
        version: user.version + 1,
        updatedAt: new Date(),
      },
    });

    return this.prepareUserForResponse(updatedUser);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);

    if (user) {
      await this.prisma.user.delete({ where: { id } });
    }
  }

  private prepareUserForResponse(user: User): UserResponseType {
    return removeObjectKey(
      {
        ...user,
        updatedAt: user.updatedAt.getTime(),
        createdAt: user.createdAt.getTime(),
      },
      ['password'],
    );
  }
}
