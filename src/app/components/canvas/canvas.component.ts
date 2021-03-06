import {
  Component, Input, ElementRef, ViewChild, OnInit
} from '@angular/core';

@Component({
  selector: 'app-canvas',
  template: '<canvas #myCanvas></canvas>',
  styles: ['canvas { border: 1px solid #000; }']
})

export class CanvasComponent implements OnInit {
  video: any;
  constructor() { }
  // ngOnInit(): void {
  //   let canvas = <HTMLCanvasElement>$('#example').find('canvas').get(0);
  //   let ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
  // }
  // a reference to the canvas element from our template
  @ViewChild('myCanvas') public canvas: ElementRef;

  // setting a width and height for the canvas
  public width = 400;
  public height = 400;

  private cx: CanvasRenderingContext2D;

  ngOnInit() {
    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // set some default properties about the line
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    // we'll implement this method to start capturing mouse events
    // this.captureEvents(canvasEl);
  }

  handleSuccess(stream) {
    // window.stream = stream; // only to make stream available to console
    this.video.srcObject = stream;
  }

  handleError(error) {
    console.log('getUserMedia error: ', error);
  }


  // private captureEvents(canvasEl: HTMLCanvasElement) {
  //   Observable
  //     // this will capture all mousedown events from teh canvas element
  //     .fromEvent(canvasEl, 'mousedown')
  //     .switchMap((e) => {
  //       return Observable
  //         // after a mouse down, we'll record all mouse moves
  //         .fromEvent(canvasEl, 'mousemove')
  //         // we'll stop (and unsubscribe) once the user releases the mouse
  //         // this will trigger a 'mouseup' event
  //         .takeUntil(Observable.fromEvent(canvasEl, 'mouseup'))
  //         // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
  //         .takeUntil(Observable.fromEvent(canvasEl, 'mouseleave'))
  //         // pairwise lets us get the previous value to draw a line from
  //         // the previous point to the current point
  //         .pairwise()
  //     })
  //     .subscribe((res: [MouseEvent, MouseEvent]) => {
  //       const rect = canvasEl.getBoundingClientRect();

  //       // previous and current position with the offset
  //       const prevPos = {
  //         x: res[0].clientX - rect.left,
  //         y: res[0].clientY - rect.top
  //       };

  //       const currentPos = {
  //         x: res[1].clientX - rect.left,
  //         y: res[1].clientY - rect.top
  //       };

  //       // this method we'll implement soon to do the actual drawing
  //       this.drawOnCanvas(prevPos, currentPos);
  //     });
  // }
  // private drawOnCanvas(
  //   prevPos: { x: number, y: number },
  //   currentPos: { x: number, y: number }
  // ) {
  //   // incase the context is not set
  //   if (!this.cx) { return; }

  //   // start our drawing path
  //   this.cx.beginPath();

  //   // we're drawing lines so we need a previous position
  //   if (prevPos) {
  //     // sets the start point
  //     this.cx.moveTo(prevPos.x, prevPos.y); // from
  //     // draws a line from the start pos until the current position
  //     this.cx.lineTo(currentPos.x, currentPos.y);

  //     // strokes the current path with the styles we set earlier
  //     this.cx.stroke();
  //   }
  // }

}
