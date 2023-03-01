import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPackeryComponent } from './components/ngx-packery/ngx-packery.component';
import { NgxPackeryItemDirective } from './directive/ngx-packery-item.directive';

@NgModule({
  declarations: [
    AppComponent,
    NgxPackeryComponent,
    NgxPackeryItemDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
