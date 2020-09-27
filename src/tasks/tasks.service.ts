import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, Taskstatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { Createtaskdto } from './dto/create-task.dto';
import { Gettasksfilterdto } from './dto/get-task-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private cars = [
    { name: 'shahab', job: 'android' },
    { name: 'Mahdad', job: 'Swift' },
  ];
  getAllTasks() {
    return this.tasks;
  }

  getfilter(filterdto: Gettasksfilterdto): Task[] {
    const { search } = filterdto;

    if (search) {
      console.log('You are working with search');
      return this.tasks.filter(item => item.title.includes(search));
    } else {
      return this.tasks;
    }
  }

  getCars() {
    console.log(this.cars.find(item => item.job));
    return this.cars.map(item => item.job);
  }

  getTaskByName(title: string): Task {
    return this.tasks.find(task => task.title === title);
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id);
    if (!found) {
      throw new NotFoundException(`Sorry this ${id} not found`);
    }
    return found;
  }

  createTask(createTaskDto: Createtaskdto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: Taskstatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }

  deleteTaskById2(name: string) {
    this.tasks = this.tasks.filter(task => task.title !== name);
  }

  updateTaskStatus(id: string, status: Taskstatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
