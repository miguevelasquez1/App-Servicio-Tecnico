import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  private darkMode;

  constructor() {
    this.darkMode = true;
  }

  ngOnInit() {
  }

  cambio() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle( 'dark' );
  }

}
