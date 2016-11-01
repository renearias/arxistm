import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TasksComponent } from './tasks.component';
import { TasksService } from './tasks.service';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [TasksComponent],
    providers: [TasksService],
    exports: [TasksComponent]
})

export class TasksModule { }
