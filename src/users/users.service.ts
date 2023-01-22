import { HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserStatus } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {};

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({email: createUserDto.email})
    if (user) {
      throw new HttpException(
        'Пользователь уже зарегестрирован',
        HttpStatus.FORBIDDEN,
      );
    }
    createUserDto.register = createUserDto.lastVisit = new Date();
    return this.userRepository.create(createUserDto)
  }

  async findAll() {
    return await this.userRepository.find({
      order: {
        'id': 'ASC'
      }
    })
  }

  async remove(id: number) {
    return await this.userRepository.delete(id)
  }

  async updateStatusBlock(id: number) {
    const user = await this.userRepository.findOneBy({id});

    if (!user) throw new NotAcceptableException('Пользователя не существует');

    let newValue = user.status === UserStatus.UNBLOCK ? UserStatus.BLOCK : UserStatus.BLOCK;
    await this.userRepository.update(id, {status: newValue});
    return user;
  }

  async updateStatusUnBlock(id: number) {
    const user = await this.userRepository.findOneBy({id});

    if (!user) throw new NotAcceptableException('Пользователя не существует');
    
    let newValue = user.status === UserStatus.BLOCK ? UserStatus.UNBLOCK : UserStatus.UNBLOCK;
    await this.userRepository.update(id, {status: newValue});
    return user;
  }
}
