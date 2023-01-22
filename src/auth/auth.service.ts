import { AuthCheck } from './dto/checkUser.dto';
import { ForbiddenException, HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserStatus } from 'src/users/entities/user.entity';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from './dto/authLogin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async login(dto: AuthLoginDto) {
    const user = await this.userRepository.findOne({ where: { email: dto.email } });
    if (!user) throw new NotAcceptableException('Пользователя не существует');

    const passwordValid = await bcrypt.compare(dto.password, user.password)

    if (!passwordValid) throw new ForbiddenException('Введен неверный логин или пароль');

    user.lastVisit = new Date();
    this.userRepository.save(user);
    return user
  }

  hashData(data: string) {
    return bcrypt.hash(data, 5);
  }

  async register(dto: AuthDto) {
    const lastUser = await this.userRepository.findOneBy({email: dto.email})
    if (lastUser) {
      throw new HttpException(
        'Пользователь уже зарегестрирован',
        HttpStatus.FORBIDDEN,
      );
    }
    const hashPassword = await this.hashData(dto.password)

    const newUser =  this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashPassword,
      register: new Date(),
      lastVisit: new Date()
    })

    const user = await this.userRepository.save(newUser);
    return user;
  }
    
  async validateUser(dto: AuthCheck) {
    const user = await this.userRepository.findOne({ where: { email: dto.email } })
    if (!user || user.status !== UserStatus.UNBLOCK) return false;
    else return true;
  }
}