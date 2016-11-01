import {Injectable} from '@angular/core';
//import {AuthHttp} from 'angular2-jwt';
//import {urlApi} from  '../http/http';
import {EntityInterface} from '../../entity/entity-interface';
//import {EntityRESTClientInterface} from '../rest/entity-rest-client-interface';
import {Observable} from "rxjs/Observable";
import {Response} from '@angular/http';

export interface EntityServiceInterface {
  
  routeREST: string;
  getAll(id: number | string): any;
  get(id: number | string): any;
  //create(entity: EntityInterface): any;
  //edit(entity: EntityInterface): any;
  //delete(id: number | string): Observable<any>;
  delete(id: number | string): any;
}

