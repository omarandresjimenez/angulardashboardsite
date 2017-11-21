import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SidebarmenuComponent } from './sidebarmenu/sidebarmenu.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarmenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
