import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription, catchError, interval, take } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from  '@angular/common/http';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  @ViewChild('iframeRef', {static: false}) iframeRef: ElementRef | undefined;
  title = 'nbps-doc-proto';
  // iframeUrl = "https://docs.google.com/document/d/e/2PACX-1vR2GYsnRE5mRKgU-2htPJ0wifqufmgljbp5_UK0VgcrsBNLazcOEZI9PvIqV8CDleLWocDRvx8RS0C3/pub";
  iframeUrl:any = "https://docs.google.com/document/d/1OP58emARFbUEHPbESoEJt2eQDMvWrD7NWFr2use0UbI/edit";
  // iframeUrl = "https://docs.google.com/document/d/e/2PACX-1vR2GYsnRE5mRKgU-2htPJ0wifqufmgljbp5_UK0VgcrsBNLazcOEZI9PvIqV8CDleLWocDRvx8RS0C3/pub?embedded=true";
  private checkIFrameSubscription: Subscription | undefined;


  constructor(private spinner:NgxSpinnerService,private http:HttpClient,private domSanitizer: DomSanitizer){
    
  }
reloadIFrame(iframe: any) {

if (iframe) {

iframe.src = this.iframeUrl; // Google document viewer url.

}

}
checkIFrame(iframe: any) {

  if (iframe) {
  
  iframe.onload = () => {
  
  if (this.checkIFrameSubscription) {
  
  this.checkIFrameSubscription.unsubscribe();
  
  }
  
  };
  
  }
  
  }




  ngAfterViewInit() {
    
    this.spinner.show();
      this.http.get<any>('https://nbps-docs.onrender.com/getForm').subscribe(data => {
        this.iframeUrl = data;
        console.log(this.iframeUrl)
        this.spinner.hide()
    },
    err=>{
      console.log(err)
      this.spinner.hide();
      this.iframeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(err.error.text)
    })  

    // let iframe = (this.iframeRef) ? this.iframeRef.nativeElement : null;
    
    // this.checkIFrame(iframe);
    
    // this.checkIFrameSubscription = interval(3000)
    
    // .pipe(take(Math.round(20000 / 3000)))
    
    // .subscribe(() => {
    
    // if (iframe == null) {
    
    // iframe = (this.iframeRef) ? this.iframeRef.nativeElement : null;
    
    // this.checkIFrame(iframe);
    
    // }
    
    // this.reloadIFrame(iframe);
    
    // });
    
    }
}
