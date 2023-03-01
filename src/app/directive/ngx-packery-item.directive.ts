import { AfterViewInit, Directive, ElementRef, forwardRef, Inject, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { NgxPackeryComponent } from '../components/ngx-packery/ngx-packery.component';

@Directive({
  selector: '[ngxPackeryItem], ngxPackeryItem'
})
export class NgxPackeryItemDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() prepend = false;
  @Input() triggerChangeSize : boolean = false;
  @Input() toggleSize?: string;
  constructor(
    public element: ElementRef,
    @Inject(forwardRef(() => NgxPackeryComponent)) private parent: NgxPackeryComponent,
    private renderer: Renderer2,
  ) {}
  ngOnInit() {
    this.renderer.setStyle(this.element.nativeElement, 'position', 'fixed');
    this.renderer.setStyle(this.element.nativeElement, 'right', '-150vw');
    this.parent.addPendingItem(this);
  }
  ngOnChanges(changes: SimpleChanges): void {
    const {triggerChangeSize} = changes;
    if(!triggerChangeSize.firstChange){
      this.parent.setWidth(this.element.nativeElement, triggerChangeSize.currentValue ? this.toggleSize : 'auto'  )
      this.parent.reloadItems();
      this.parent.layout();
      return;
    }
  }
  ngAfterViewInit() {
  }
  ngOnDestroy() {
  }
}
