import { Injectable } from "@nestjs/common";
import { NotificationsService } from "../notifications/notification.service";

@Injectable()
export class TaskService {
    constructor (private readonly notificationsService: NotificationsService) {}
create (task:any) {
    this.notificationsService.notify('tasks', 'task_created', { taskId: task.id, title: task.title });
}
}