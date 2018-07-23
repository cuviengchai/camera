import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MycomponentComponent } from './components/mycomponent/mycomponent.component';
import { HttpClientModule } from '@angular/common/http';
import { CanvasComponent } from './components/canvas/canvas.component';
import { CaptureComponent } from './components/capture/capture.component';

import { HomeComponent } from './components/home/home.component';

import { CameraModalComponent } from './components/modals/camera-modal/camera-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    MycomponentComponent,
    CanvasComponent,
    CaptureComponent,
    HomeComponent,
    CameraModalComponent
  ],
  entryComponents: [
    CameraModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
