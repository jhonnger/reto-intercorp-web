import {Component, OnInit} from '@angular/core';
import {LoaderService} from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loaders = 0;

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.loaderService.showLoaderEvent
      .subscribe(showLoader => {
        if (showLoader) {
          this.loaders++;
        }
        if (!showLoader && this.loaders > 0) {
          this.loaders--;
        }
      });
  }
}
