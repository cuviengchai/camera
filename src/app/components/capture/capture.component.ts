import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CaptureComponent implements AfterViewInit {

  @ViewChild('video') public video: ElementRef;
  @ViewChild('canvas') public canvas: ElementRef;
  @ViewChild('watermark') public watermark: ElementRef;
  @ViewChild('watermarksmall') public watermark_small: ElementRef;
  public captures: Array<any>;

  public constructor() {
    this.captures = [];
  }

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.src = window.URL.createObjectURL(stream);
        this.video.nativeElement.play();
      });
    }
  }

  public capture() {
    const context = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement, 0, 0, 640, 480);
    // -------- Big Background --------
    context.drawImage(this.watermark.nativeElement, 1, 0, 640, 480);

    // // -------- Small Backgroud --------
    // const pattern = context.createPattern(this.watermark_small, 'repeat');
    // context.rect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    // context.fillStyle = pattern;
    // context.fill();

    // // -------- Text --------
    // context.font = '45px serif';
    // context.fillStyle = '#000000';
    // const today = new Date();
    // const text = 'สำเนาถูกต้อง\nไง' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    // context.fillText(text, 100, 100);

    const img_data = context.getImageData(0, 0, 640, 480);
    const data = img_data.data;
    for (let i = 0; i < data.length; i += 4) {
      // YCbCr Luma = 0.299*r + 0.587*g + 0.114*b
      const brightness = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = brightness;
      data[i + 1] = brightness;
      data[i + 2] = brightness;
    }
    context.putImageData(img_data, 0, 0);

    const dataURL_png = this.canvas.nativeElement.toDataURL('image/png');
    this.captures.push(dataURL_png);

    const block = dataURL_png.split(';');
    const realData = block[1].split(',')[1];
    const formData = new FormData();
    formData.append('file', realData);
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:3000/pngUpload');
    xhr.send(formData);
  }
}
