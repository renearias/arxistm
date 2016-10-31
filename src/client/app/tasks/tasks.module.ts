import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { TasksService } from './tasks.service';

@NgModule({
    imports: [CommonModule, TasksService],
    declarations: [TasksComponent],
    exports: [TasksComponent]
})

export class TasksModule { }
