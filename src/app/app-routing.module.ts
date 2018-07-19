import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttachmentPageComponent } from './components/attachment-page/attachment-page.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { CaptureComponent } from './components/capture/capture.component';

const routes: Routes = [
  { path: 'attachment', component: AttachmentPageComponent },
  { path: 'canvas', component: CanvasComponent },
  { path: 'video', component: CaptureComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
