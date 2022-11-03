import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { handleErrors } from '../common/helpers/handleErrors';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/payload.interface';
import * as bcrypt from 'bcrypt';

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async signIn(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create({
        ...createUserDto,
        password: bcrypt.hashSync(createUserDto.password, 10),
      });
      await this.userRepository.save(user);

      return { ...user, token: this.makeJwt({ ...user }) };
    } catch (error) {
      this.logger.error(error);
      handleErrors(error);
    }
  }

  async signUp({ email, password }: CreateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email.toLocaleLowerCase() },
        select: { uuid: true, email: true, password: true },
      });

      if (!user || !bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException(
          'User or password invalid, check your credentials',
        );

      return { ...user, token: this.makeJwt({ ...user }) };
    } catch (error) {
      this.logger.error(error);
      handleErrors(error);
    }
  }

  private makeJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
