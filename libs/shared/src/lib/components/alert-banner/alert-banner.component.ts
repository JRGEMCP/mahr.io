import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'm8io-alert-banner',
  templateUrl: './alert-banner.component.html',
  styleUrls: ['./alert-banner.component.scss']
})
export class AlertBannerComponent implements OnInit {
  @Input() errors;
  @Input() success;
  constructor() { }

  ngOnInit() {
  }

}
