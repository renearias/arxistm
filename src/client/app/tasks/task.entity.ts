import {Entity} from '../entity/index';

export class Task extends Entity{
    
    tarea: string;
    descripcion:string;
    isurgent:	boolean;
    timeEstimate: number;
    priority: number;
    assignedto: number|any;
    
}
