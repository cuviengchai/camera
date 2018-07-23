import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CaptureComponent implements OnInit, AfterViewInit {

  @ViewChild('videoElement') public videoElement: any;
  @ViewChild('canvas') public canvas: ElementRef;
  @ViewChild('watermark') public watermark: ElementRef;
  @ViewChild('watermarksmall') public watermark_small: ElementRef;

  video: any;
  straem: any;
  video_stream: any;
  private width: number;
  private height: number;
  public captures: Array<any>;


  public constructor() {
    this.captures = [];
    this.width = 1280;
    this.height = 720;
  }

  ngOnInit() {
    this.video = this.videoElement.nativeElement;
  }

  public ngAfterViewInit() {
    const browser = <any>navigator;


    browser.getUserMedia = (browser.getUserMedia || browser.webkitGetUserMedia
      || browser.mozGetUserMedia || browser.msGetUserMedia);

    const videoConstraints = {
      video: { width: { exact: 1280 }, height: { exact: 720 } }
    };
    browser.mediaDevices.getUserMedia(videoConstraints).then(stream => {
      // stream_video = stream;
      this.video.srcObject = stream;
      this.video_stream = stream;
      this.video.play();
    });


    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //   navigator.c.getUserMedia({ video: true }).then(stream => {
    //     // this.video.nativeElement.src = window.URL.createObjectURL(stream);
    //     this.video.srcObject = stream;
    //     // this.video.play();
    //   });
    // }
  }
  private stop() {
    this.video_stream.getVideoTracks()[0].stop();
  }
  private pause() {
    this.video.pause();
  }

  public capture() {
    const context = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video, 0, 0);
    this.pause();
    this.stop();
    // -------- Big Background --------
    // context.drawImage(this.watermark.nativeElement, 1, 0, 640, 480);

    // // -------- Small Backgroud --------
    const pattern = context.createPattern(this.watermark_small.nativeElement, 'repeat');
    context.rect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    context.fillStyle = pattern;
    context.fill();

    // box transparent
    context.fillStyle = '#FFFFFF';
    context.globalAlpha = 0.7;
    context.fillRect(0, 100, 1280, 150);
    context.globalAlpha = 1.0;

    // // -------- Text --------
    context.font = '45px serif';
    context.fillStyle = '#000000';
    const today = new Date();
    // tslint:disable-next-line:max-line-length
    const header = 'สำเนาถูกต้อง ใช้สำหรับการเปิดบัญชี       วันที่' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    context.fillText(header, 100, 200);
    const topic1 = '1. ....';
    context.fillText(topic1, 50, 300);
    const topic2 = '2. ....';
    context.fillText(topic2, 50, 350);
    const topic3 = '3. ....';
    context.fillText(topic3, 50, 400);
    const topic4 = '4. ....';
    context.fillText(topic4, 50, 450);

    const img_data = context.getImageData(0, 0, this.width, this.height);
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
