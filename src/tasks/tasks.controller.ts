import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { title } from 'process';
import { Task, Taskstatus } from './task.model';
import { Createtaskdto } from './dto/create-task.dto';
import { Gettasksfilterdto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/gettasks')
  gettasks(@Query() filterdto: Gettasksfilterdto): Task[] {
    console.log(Object.keys(filterdto).length);
    if (Object.keys(filterdto).length > 0) {
      return this.tasksService.getfilter(filterdto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/name')
  getCars() {
    return this.tasksService.getCars();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id);
  }

  @Post('/del')
  deleteTaskById2(@Body('name') name: string) {
    console.log(name);
    return this.tasksService.deleteTaskById2(name);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: Taskstatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: Createtaskdto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
