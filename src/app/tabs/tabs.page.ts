import { Component,ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})




export class TabsPage {

  selectedTab;

  @ViewChild('myTabs') tabs: IonTabs;
  hola(){
    this.selectedTab =  this.tabs.getSelected()
  }
  constructor() {}

}
