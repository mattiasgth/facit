import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-loading',
    template: `
    <img src="{{loadingImageUrl}}">
  `,
    styles: [`
    :host {
      display: block;
    }
    img {
      display: block;
      margin: 20px auto;
      width: 50px;
    }
  `]
})
export class LoadingComponent implements OnInit {

    public loadingImageUrl = "../../assets/loading.svg";
    constructor() { }

    ngOnInit() {
    }

}
