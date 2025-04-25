import { Module, OnModuleInit } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user';
import { Role } from 'src/auth/enums/role.enum';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const users = [
      { username: 'admin', password: 'admin123', role: Role.Admin },
      { username: 'user', password: 'user123', role: Role.User },
    ];

    for (const u of users) {
      const existingUser = await this.userRepository.findOne({
        where: { username: u.username },
      });
      if (!existingUser) {
        const user = this.userRepository.create(u);
        await this.userRepository.save(user);
      }
    }
  }
}
