import { Component } from '@angular/core';
import { CrudIndexInterface } from '../components/crud/crud-index-interface';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { columnDateTime } from '../directives/dynamicDataTable/index'


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
    columns: any = [
                        {  title:'Id' ,data: 'id', name: 'id' },
                        {  title:'Tarea' ,data: 'tarea', name: 'tarea' },
                        columnDateTime('Creado','created','created'),
                        {  title:'Asignado A' ,data: 'assignedto.name', name: 'assignedto.name' },
                        {  title:'Descripcion' ,data: 'descripcion', name:'descripcion' },
                        {  title:'Urgente' ,data: 'isurgent', name:'isurgent' },
                        {  title:'Estado' ,data: 'state', name:'state' },
                    ];
    constructor(private tasks: TasksService){
    }
    
    accion(){
        let task= new Task();
        task.tarea='hacer algo';
        task.descripcion='descibe algo';
        task.isurgent= true;
        task.timeEstimate=12;
        task.priority=1;
        task.assignedto=1;
        console.log(this.columns, this.tasks.getUrlApiResults());
        //this.tasks.create(task);
    }
}
