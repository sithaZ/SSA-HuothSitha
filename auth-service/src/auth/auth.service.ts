import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

// Entities
import { User } from '../entities/user.entity';
import { UserRole } from '../entities/user-role.entity';
import { Role } from '../entities/role.entity';
import { RolePermission } from '../entities/role-permission.entity';
import { RefreshToken } from '../entities/refresh-token.entity';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,

    @InjectRepository(User)
    private readonly users: Repository<User>,

    @InjectRepository(UserRole)
    private readonly userRoles: Repository<UserRole>,

    @InjectRepository(Role)
    private readonly roles: Repository<Role>,

    @InjectRepository(RolePermission)
    private readonly rolePerms: Repository<RolePermission>,

    @InjectRepository(RefreshToken)
    private readonly refreshTokens: Repository<RefreshToken>,
  ) {}

  async register(email: string, pass: string) {
    const existing = await this.users.findOne({ where: { email } });
    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    const passwordHash = await bcrypt.hash(pass, 10);
    const newUser = this.users.create({ email, passwordHash, isActive: true });
    await this.users.save(newUser);

    const userRoleEntity = await this.roles.findOne({
      where: { name: 'user' },
    });
    if (userRoleEntity) {
      await this.userRoles.save({
        user: newUser,
        role: userRoleEntity,
      });
    }

    return { message: 'User registered successfully', userId: newUser.id };
  }

  async login(email: string, pass: string) {
    const user = await this.users.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const userRoles = await this.userRoles.find({
      where: { user: { id: user.id } },
      relations: { role: true },
    });
    const roleNames = userRoles.map((ur) => ur.role.name);
    const roleIds = userRoles.map((ur) => ur.role.id);

    let permissionKeys: string[] = [];

    if (roleIds.length > 0) {
      const rolePermissions = await this.rolePerms
        .createQueryBuilder('rp')
        .leftJoinAndSelect('rp.permission', 'p')
        .where('rp.roleId IN (:...roleIds)', { roleIds })
        .getMany();

      permissionKeys = [
        ...new Set(rolePermissions.map((rp) => rp.permission.key)),
      ];
    }

    const payload = {
      sub: user.id,
      email: user.email,
      roles: roleNames,
      permissions: permissionKeys,
    };

    const accessToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: (process.env.JWT_ACCESS_EXPIRES as any) || '15m',
    });

    const refreshToken = randomBytes(32).toString('hex');
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.refreshTokens.save({
      user,
      tokenHash: refreshTokenHash,
      expiresAt,
    });

    return { accessToken, refreshToken };
  }
}
