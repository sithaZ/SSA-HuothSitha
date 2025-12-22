import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import  { NotificationsModule } from "../notifications/notifications.module";

@Module({
    imports: [NotificationsModule],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}

