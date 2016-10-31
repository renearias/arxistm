import { Component } from '@angular/core';
import { CrudIndexInterface } from '../components/crud/crud-index-interface';
import { TasksService } from './tasks.service';


/**
 * This class represents the lazy loaded TasksComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-tasks',
  templateUrl: 'tasks.component.html',
  styleUrls: ['tasks.component.css']
})
export class TasksComponent { 
    contructor(private tasks: TasksService){
        console.log(tasks);
    }
    
    accion(){
        console.log("accion");
    }
}
