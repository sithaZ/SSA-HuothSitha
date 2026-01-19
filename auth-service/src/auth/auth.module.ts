import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// Modules
import { UserModule} from '../users/users.modules';
import { RbacModule } from '../rbac/rbac.module';

// Controllers & Services
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// Entities
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { UserRole } from '../entities/user-role.entity';
import { RolePermission } from '../entities/role-permission.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
// Strategies & Guards
import { JwtStrategy } from './strategies/jwt.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      Permission,
      UserRole,
      RolePermission,
      PassportModule,
      RefreshToken,
    ]),

    UserModule,
    RbacModule,

    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
