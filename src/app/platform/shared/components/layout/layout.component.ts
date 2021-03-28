import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  constructor(
    // private menu: MenuController,
    private authService: AuthService
  ) { }

  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth2().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUser(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole).hasOwnProperty('admin');
        });
      }
    });
  }

}
