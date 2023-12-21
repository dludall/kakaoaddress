
import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import 'src/assets/js/postcode.js';

// declare function postcode(renderer:any, elem:any, callback:any): void;
declare function greet(): void;
declare const daum:any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
    @ViewChild('daum_popup', { read: ElementRef, static: true }) popup!: ElementRef;
    @ViewChild('daumaddress',{ read: ElementRef, static: true }) daumaddress!: ElementRef;
    @ViewChild('daumaddress_detail',{ read: ElementRef, static: true }) daumaddress_detail!: ElementRef;

    fullAddress:string='';
    constructor(private formBuilder: FormBuilder, private renderer: Renderer2) {}

    ngOnInit() {
    }

    openDaumPopup() {
      new daum.Postcode({
        oncomplete: (data: any) => {
          console.log(data);

          this.renderer.setStyle(this.popup.nativeElement,"display","none");
          this.renderer.setProperty(this.daumaddress.nativeElement,"value",data.address);
          this.daumaddress_detail.nativeElement.setFocus();
          
        },
        width: "100%",
        height: "100%",
        maxSuggestItems: 5,
      }).embed(this.popup.nativeElement);

      // this.popup.nativeElement.style.display = 'block';

      this.renderer.setStyle(this.popup.nativeElement,"display","block");
      this.renderer.setStyle(this.popup.nativeElement,"width","100%");
      this.renderer.setStyle(this.popup.nativeElement,"height","100%");
      this.renderer.setStyle(this.popup.nativeElement,"z-index","9999");
    }

    closePop() {
      this.renderer.setStyle(this.popup.nativeElement, 'display', 'none');
    }

  
}
