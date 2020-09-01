import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView = true;
  constructor(private router: RouterService, private location: Location) {}

  switchToListView() {
    this.router.routeToListView();
    this.isNoteView = false;
  }

  switchToNoteView() {
    this.router.routeToNoteView();
    this.isNoteView = true;
  }
}
