import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanvasComponent } from './components/canvas/canvas.component';
import { CaptureComponent } from './components/capture/capture.component';
// import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: 'canvas', component: CanvasComponent },
  { path: 'video', component: CaptureComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
