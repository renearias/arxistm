/* 
 *  Rene Arias
 */
/*import {Component, ViewEncapsulation, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { NgForm }    from '@angular/common';
import {Widget} from '../../core/widget/widget';
import {NKDatetime} from 'ng2-datetime/ng2-datetime';
import {OnActivate, Router, RouteTree, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';
import {EntityInterface} from '../../models/entity-interface';
import {EntityServiceInterface} from '../../services/entity-service-interface';
import {InstanceLoader} from '../instance-loader/instance-loader';*/
//import {EntityServiceInterfaceService} from '../../services/entity-service-interface';
/*import {EntityFormComponentInterface} from './entity-form.component-interface';
import {Observable} from "rxjs/Observable";
import {Response} from '@angular/http';
declare var jQuery: any;
declare var Messenger: any;
declare var moment: any;


export abstract class EntityFormComponent implements EntityFormComponentInterface { 
  
  model: EntityInterface;
  editable: boolean= false;
  labelForm: string= 'Crear';
  labelButton: string= 'Crear';
  submitted: boolean= false;
  router: Router;
  routeSegment: string;
  service: EntityServiceInterface;
  cdr: ChangeDetectorRef;
  errors: any;
  constructor(router: Router, service: EntityServiceInterface, cdr: ChangeDetectorRef) {
       this.router= router;
       this.service= service;
       this.cdr= cdr;
   }
   
  ngOnInit() {
    this.cdr.detectChanges();
  }
  ngAfterViewInit(): void {
    jQuery('.select2').select2();
    jQuery('.select2').on(
        'change',
        (e) => {this.model[e.target.name] = jQuery(e.target).val();
      }
    );
  }
  routerOnActivate(curr: RouteSegment, prev: RouteSegment, currTree: RouteTree): void {
    let isNew = currTree._root.children[0].children[0].children[0].value.stringifiedUrlSegments;
    this.routeSegment = currTree._root.children[0].children[0].value.stringifiedUrlSegments;
    if (isNew!='new')
    {
        //let id = +curr.getParam('id');
        let id = currTree._root.children[0].children[0].children[0].value.getParam('id');
        this.onPreEditAction(id);
    } 
   
   }
    onSubmit() {
        this.submitted = true;
        if (this.editable)
        {
            let message = Messenger().post({
                          message: "Actualizando registro <i class='fa fa-spinner animated rotateSpin'></i>",
                          type: "info"
                        })
            this.service.editar(this.model)
                        .subscribe(
                                   response => { 
                                       this.onEditAction(response, message);
                                   },
                                    error => {
                                            this.handleError(error);
                                    });
        }else{
            this.service.crear(this.model)
                        .subscribe(
                                   response => { 
                                            this.onCreateAction(response);
                                   },
                                    error => {
                                            this.handleError(error);
                                    });

   }
   }
   onCreateAction(res: Response){
        let body = res.json();
        this.router.navigate(['/app',this.routeSegment, body.id])
        //return body || { };
   };
   onPreEditAction(id: number | string){
       this.labelForm= 'Editar';
       this.labelButton= 'Actualizar';
       this.service.get(id).subscribe(
                                       response => { 
                                              this.extractData(response);
                                              this.editable=true;
                                              this.onPreEditLoadActions();
                                              },
                                        error => {
                                                  this.handleError(error);
                                                  });
   }; 
   onPreEditLoadActions(){};
   onEditAction(res: Response, message?){
       
       message.update({
                          message: "El registro se actualizó correctamente",
                          type: "success",
                          showCloseButton: true
                        })
   }; 
   extractData(res: Response) {
    let body = res.json();
    this.model.constructor(body);
    return body || { };
   }
   onDeleteAction(id: number | string){
       let message = Messenger().post({
                          message: "Eliminando registro...",
                          type: "info"
                        })
       this.service.eliminar(id).subscribe(
                                       response => { 
                                                message.update({
                                                      message: "Registro eliminado correctamente",
                                                      type: "error",
                                                      showCloseButton: true
                                                    })
                                                this.router.navigate(['/app',this.routeSegment])
                                              },
                                        error =>{
                                                  message.update({
                                                      message: "Ocurrió un error al eliminar",
                                                      type: "error",
                                                      showCloseButton: true
                                                    })
                                                  //this.handleError(error);
                                               });
   }
   handleError (error: Response) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errors = error.json();
    if (errors.code==400)
    {this.errors=errors}
    //let errMsg = (error.message) ? error.message :
    //  error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    //console.error(errMsg); // log to console instead
    //return Observable.throw(errMsg);
    return errors || [];
  }
  getFieldErrors(field: string){
      if (typeof(this.errors)=='undefined')
      { return [] }
      else
      {
      return this.errors.errors.children[field].errors;
      }
  }
}


*/