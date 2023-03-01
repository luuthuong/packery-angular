import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, PLATFORM_ID, SimpleChanges } from '@angular/core';
import Packery from 'packery';
import { NgxPackeryItemDirective } from 'src/app/directive/ngx-packery-item.directive';
import { NgxPackeryOptions } from 'src/app/models/ngx-packery-options';
declare var jQuery: any;
@Component({
  selector: '[ngx-packery], ngx-packery',
  template: '<ng-content></ng-content>',
  styles: [
    `
		:host {
			display: block;
		}
	`
  ]
})
export class NgxPackeryComponent implements OnInit, OnChanges, OnDestroy  {
  constructor(@Inject(PLATFORM_ID) private platformId: any, private _element: ElementRef) {}
  public packeryInstance: any;
  @Input() options !: NgxPackeryOptions;
  @Input() updateLayout = false;
  @Output() layoutComplete: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() removeComplete: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() itemsLoaded: EventEmitter<number> = new EventEmitter<number>();
  private pendingItems: NgxPackeryItemDirective[] = [];
  ngOnInit() {
    if (!this.options) {
      this.options = {};
    }
    if (!this.options.itemSelector) {
      this.options.itemSelector = '[ngxPackeryItem], ngxPackeryItem';
    }
    this.options.transitionDuration = '0s';
    if (isPlatformBrowser(this.platformId)) {
      this.packeryInstance = new Packery(this._element.nativeElement, this.options);
      this.packeryInstance.on('layoutComplete', (items: any) => {
        this.layoutComplete.emit(items);
      });
      this.packeryInstance.on('removeComplete', (items: any) => {
        this.removeComplete.emit(items);
      });
      this.packeryInstance.items=[];
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    const {updateLayout} = changes;
    if (updateLayout) {
      if (!updateLayout.firstChange) {
        this.layout();
      }
    }
  }
  ngOnDestroy() {
    if (this.packeryInstance) {
      this.packeryInstance.destroy();
    }
  }
  public layout() {
    setTimeout(() => {
      this.packeryInstance.layout();
    });
  }
  public reloadItems() {
    setTimeout(() => {
      this.packeryInstance.reloadItems();
    });
  }
  public addPendingItem(item: NgxPackeryItemDirective) {
    if(!item)
      return;
    this.pendingItems.push(item);
  }
  public add(newItem: NgxPackeryItemDirective) {
    if(newItem)
      this.itemLoaded(newItem);
  }
  private itemLoaded(item: NgxPackeryItemDirective) {
    if(!item)
      return;
    if(isPlatformBrowser(this.platformId)){
      this.packeryInstance.prepended(item.element.nativeElement);
      if (item.prepend) {
      } else {
        this.packeryInstance.appended(item.element.nativeElement);
      }
      if (this.packeryInstance.items.length === 1) {
          this.packeryInstance.layout();
      }
      this.packeryInstance.layout()
    }
  }
  public remove(element: HTMLElement) {
    if (isPlatformBrowser(this.platformId)) {
      this.packeryInstance.remove(element);
      this.layout();
    }
  }
  public shiftLayout(){
    setTimeout(()=>{
      this.packeryInstance.shiftLayout();
    });
  }
  public toggleClassChild(element: HTMLElement, className: string){
    jQuery(element).toggleClass(className);
  }
  public setWidth(element: HTMLElement, width: any){
    jQuery(element).width(width);
  }
}
