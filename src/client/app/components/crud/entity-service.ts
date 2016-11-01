import {Injectable} from '@angular/core';
import {EntityInterface} from '../../entity/entity-interface';
import {Config} from '../../shared/index';
import {Http, Headers, Response, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {requestDefaultOptions, OAuth2Service} from '../../shared/index';
import {EntityServiceInterface} from './entity-service-interface';

@Injectable()
export abstract class EntityService implements EntityServiceInterface{
  
  routeREST: string = '';    
  constructor(private http: Http){
  }
  getRouteREST() {
      return `${Config.API}api/${this.routeREST}`;
  }
  getAll() {
    return this.http.get(this.getRouteREST(),requestDefaultOptions).subscribe(
            (res)=>{
              console.log(res.json());
              return res.json();
            },this.handleError);
    
  }
  results() {
      console.log(`${this.getRouteREST()}/results`);
  }
  get(id: number | string) {
    //return this.entityRESTClient.getOneById(id);
  }
  create(entity: EntityInterface) {
      return this.http.post(this.getRouteREST(),entity.prepareToSend(),requestDefaultOptions).subscribe(
            (res)=>{
              console.log(res.json());
              return res.json();
            },this.handleError);
  }
  edit(entity: EntityInterface) {
      //let id = entity['id'];
      //return this.entityRESTClient.putOneById(id,entity.prepareToSend());
  }
  delete(id: number | string) {
      //return this.entityRESTClient.deleteOneById(id);
  }
  
  public handleError (error: Response | any) {
      // In a real world app, we might use a remote logging infrastructure
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = err;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.log(errMsg);
      return Observable.throw(errMsg);
  }
  
}