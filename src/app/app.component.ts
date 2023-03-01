import { Component } from '@angular/core';
// @ts-ignore
import jQueryBridget from 'jquery-bridget';
import Packery from 'packery'
import { NgxPackeryItemModel } from './models/ngx-packery-item';
import { NgxPackeryOptions } from './models/ngx-packery-options';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: NgxPackeryItemModel<number>[] = new Array(20).fill(0).map((_, index) =>({
    data: index,
    expanded: false
  }));
  readonly ngxMasonryOption: NgxPackeryOptions ={
    itemSelector: '.grid-item',
    columnWidth: '.grid-item',
    resize: true,
    fitWidth: true
  };
  constructor() {

  }
  ngOnInit(): void {
    
  }
}
