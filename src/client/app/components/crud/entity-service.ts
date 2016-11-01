import {Injectable} from '@angular/core';
import {EntityInterface} from '../../entity/entity-interface';
//import {EntityRESTClientInterface} from '../rest/entity-rest-client-interface';
import {EntityServiceInterface} from './entity-service-interface';

@Injectable()
export abstract class EntityService implements EntityServiceInterface{
    
  /*constructor(public entityRESTClient: EntityRESTClientInterface){
      
  }*/
  getAll() {
   //return this.entityRESTClient.getAll(); 
      console.log("getAll");
   }
  get(id: number | string) {
    //return this.entityRESTClient.getOneById(id);
  }
  create(entity: EntityInterface) {
      //return this.entityRESTClient.post(entity.prepareToSend());
  }
  edit(entity: EntityInterface) {
      //let id = entity['id'];
      //return this.entityRESTClient.putOneById(id,entity.prepareToSend());
  }
  delete(id: number | string) {
      //return this.entityRESTClient.deleteOneById(id);
  }
}