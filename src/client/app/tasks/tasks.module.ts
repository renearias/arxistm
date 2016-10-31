import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { TasksService } from './tasks.service';

@NgModule({
    imports: [CommonModule],
    declarations: [TasksComponent],
    providers: [TasksService],
    exports: [TasksComponent]
})

export class TasksModule { }
