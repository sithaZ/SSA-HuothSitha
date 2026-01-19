import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
// import { UsersController } from './users/users.controller';
import { RbacModule } from './rbac/rbac.module';
import { DemoController } from './demo.controller';
import { UserModule } from './users/users.modules';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    RbacModule,
    DatabaseModule],
  controllers: [AppController, DemoController],
  providers: [AppService],
})
export class AppModule {}
