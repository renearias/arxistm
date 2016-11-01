import { Component, OnInit } from '@angular/core';
import { NameListService } from '../shared/index';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})

export class HomeComponent implements OnInit {

  items: FirebaseListObservable<any>;
  columns: any = [];
  newName: string = '';
  errorMessage: string;
  names: any[] = [];

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public nameListService: NameListService, af: AngularFire) {
        
        this.items = af.database.list('/tasks');
        this.columns = [
                    {  title:'Nombre' ,data: 'name' }//,
                    //{ data: 'position' }//,
                    /*{ data: 'salary' },
                    { data: 'office' }*/
                ];
        
  }
  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.getNames();
  }

  /**
   * Handle the nameListService observable
   */
  getNames() {
    this.nameListService.get()
      .subscribe(
        names => this.names = names,
        error =>  this.errorMessage = <any>error
      );
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // TODO: implement nameListService.post
    this.names.push(this.newName);
    this.newName = '';
    return false;
  }

}
