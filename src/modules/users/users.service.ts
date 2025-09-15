import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  private async hash(pwd: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(pwd, salt);
  }

  async create(dto: CreateUserDto) {
    const existing = await this.repo.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already registered');
    const user = this.repo.create({
      email: dto.email,
      name: dto.name,
      role: dto.role ?? 'client',
      passwordHash: await this.hash(dto.password),
    });
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find();
  }

  async findOneByEmail(email: string) {
    return this.repo.findOne({ where: { email }, withDeleted: false, select: ['id','email','name','role','passwordHash','createdAt','updatedAt'] });
  }

  async findOne(id: string) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    if ((dto as any).password) {
      (dto as any).passwordHash = await this.hash((dto as any).password);
      delete (dto as any).password;
    }
    Object.assign(user, dto);
    return this.repo.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.repo.remove(user);
    return { deleted: true };
  }
}
