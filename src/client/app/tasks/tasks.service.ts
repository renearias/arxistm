import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
/*import {Ingreso} from './ingreso';*/

/*import {EntityServiceInterface} from '../services/entity-service-interface';*/
import {EntityService} from '../components/crud/entity-service';

@Injectable()
export class TasksService extends EntityService {
    
  routeREST: string = 'tareas';
   
  constructor(http: Http){
    super(http);
  } 
}
