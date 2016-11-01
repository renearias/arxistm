import {Directive, Input, OnDestroy, OnInit, AfterViewInit} from '@angular/core';
import { ElementRef, ViewContainerRef } from '@angular/core';
import {Http} from '@angular/http'
import {DataTableLangEsES} from './translations/es-ES'
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
//import {ROUTER_DIRECTIVES, Router} from '@angular/router';
//import {columnAction} from './columnAction';
//import {ConfigService} from '../../core/config';
declare var jQuery: any;
@Directive({ selector: '[dynamicDataTable]'})
export class DynamicDataTable {
    $el: any;
    private $dataTable: any;
    _urlApiResults: string = '';
    _routeActions: string = '';
    private _columns: any = [];
    private _items: any;
    private _data: any = [];
    private _footerCallback: any = null;
    constructor(private el: ElementRef, private http: Http /*, private router: Router*/) {
        this.$el = jQuery(el.nativeElement);
        
                  
   }
   /*@Input() set routeActions(routeActions: any){
          this._routeActions = routeActions || this._routeActions;
        }*/
   @Input() set columns(columns: Array<any>){
       this._columns = columns || this._columns;
        }
   /*@Input() set items(items: Array<any> | FirebaseListObservable<any>){
       this._items = items || this._items;
        }  */  
   /*@Input() set footerCallback(footer: any){
          this._footerCallback = footer || this._footerCallback;
        }*/
   @Input() set urlApiResults(urlApiResults: string){
          this._urlApiResults = urlApiResults || this._urlApiResults;
        }
   ngOnInit(): void {
        //this._columns.push(columnAction(this._routeActions));
        //var routerI = this.router;
        //var footerCallback = this._footerCallback;
        /*var footer = this.$el.tfoot({
            
        });*/
        
        // Setup - add a text input to each footer cell
        
       /*this._items.subscribe((data: any)=>{
           if (this.$dataTable!==undefined){
               this.$dataTable.destroy();
           }
            this.renderizeDataTable(data);
          })*/
        this.renderizeDataTable();     
    }
    
    renderizeDataTable(data?: any): void {
         this.$dataTable = this.$el.DataTable(
                {
                    'order': [[ 0, 'asc' ]],
                    'dom': "<'row'<'col-sm-2'l><'col-sm-4 col-xs-12'B><'col-sm-6 col-xs-12'f>>" +
                         "<'row'<'col-sm-12'tr>>" +
                         "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                    'buttons': [
                        'copy', 'excel', 'pdf', 'print'
                    ],
                    'language': DataTableLangEsES,
                    'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'Todos']],
                    'processing': true,
                    'serverSide': true,
                    'responsive': true,
                    'data': data,
                    'columns': this._columns,
                     //fixedColumns:   true,
                   // 'footerCallback': this._footerCallback,
                    'ajax': {
                        'url': this._urlApiResults,
                        'type': 'GET',
                        'beforeSend': function (request: any){
                            request.setRequestHeader('Accept', 'application/json');
                            let access_token = localStorage.getItem('access_token');
                            request.setRequestHeader('Authorization', 'Bearer ' + access_token);
                        }

                    }
                })
               /* .on('draw.dt', function (e, datatable, row){
                        let tableActions = jQuery('.wraper-actions a');
                        var i;
                        for (i = 0; i < tableActions.length; i++) {
                            tableActions[i].addEventListener('click', function(event){
                                event.preventDefault();
                                var link = this.getAttribute('href');
                                routerI.navigate([link]);
                            });
                        }
                })*/
               /* .on( 'responsive-display', function ( e, datatable, row, showHide, update ){
                        
                            if (showHide) {
                                       // {% include "SgDatatablesBundle:Datatable:editable.html.twig" %}
                                    }
                                });*/
                                
         /* var oTableHeader=this.$el.find('thead');
          var searchLine=oTableHeader.append('<tr role="row"></tr>');
          var columnas = this._columns;*/
         /* this.$el.find('thead th').each( function (i) {
                           
                           
                           //var title = columnas[i]['title'];
                           var title = $(this).text();
                           if (columnas[i]['searchable']!==false)
                           {
                            searchLine.append('<th><input type="text" placeholder="'+title+'" style="width:100%" data-index="'+i+'" /></th>');
                           }else
                           {
                            searchLine.append('<th></th>');
                           }
                        });*/
          // Filter event handler
          /*jQuery(this.$datatable.table().container()).on( 'keyup', 'thead input', function () {
                this.$datatable
                    .column( $(this).data('index') )
                    .search( this.value )
                    .draw();
            } );*/
    }
}
/*            columns: [
                   { title:'Nombre', data: 'name', 
                      render: function(data) {
                                if ("" == data) {
                                      return "";
                                    } else {
                                        return "<span class='fw-semi-bold'>"+data+"</span>";
                                    }  
                                },
                    },
                    { title:'Info', data: 'info',
                      render: function(data) {
                                    if ("" == data) {
                                        return "";
                                    } else {
                                        return "<small>"+
                                                  "<span class='fw-semi-bold'>Type:</span>"+
                                                  "&nbsp; "+data.type+
                                                "</small>"+
                                                "<br>"+
                                                "<small>"+
                                                  "<span class='fw-semi-bold'>Dimensions:</span>"+
                                                  "&nbsp; "+data.dimensions+
                                                "</small>";
                                    }  
                                },  
                      
                      },
                      { title:'Descripcion', data: 'description', 
                      render: function(data) {
                                if ("" == data) {
                                      return "";
                                    } else {
                                        return "<a href='#'>"+data+"</a>";
                                    }  
                                },
                    },  
                    { title:'Estado', data: 'status', 
                      render: function(data) {
                                if ("" == data) {
                                      return "";
                                    } else {
                                        return '<div class="bg-gray-lighter progress-bar mt-xs">'+
                                                  '<progress class="progress progress-sm progress-'+data.type+'" value="100" max="100" style="width: '+data.progress+';"></progress>'+
                                                '</div>';
                                    }  
                                },
                    },  
    */
