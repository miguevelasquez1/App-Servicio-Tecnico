import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../../../servicios/auth.service';
import { HomePage } from 'src/app/home/home.page';
import { ServiciosPage } from '../../pages/servicios/servicios.page';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  constructor(
    public homePage: HomePage,
    private menu: MenuController,
    private authService: AuthService
  ) { }

  public isAdmin: boolean;
  public isTecnico: boolean;
  public userUid: string = null;

  ngOnInit() {
    this.getRole();
  }

  getRole() {
    this.authService.isAuth2().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUser(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole).admin;
          this.isTecnico = Object.assign({}, userRole).tecnico;
        });
      }
    });
  }


}
