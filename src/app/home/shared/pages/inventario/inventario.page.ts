import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../../../../services/registro.service';
import { AuthService } from '../../../../services/auth.service';
import { InventarioService } from '../../../../services/inventario.service';
import { Inventario } from 'src/app/models/inventario';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {
  isAdmin: boolean;
  inventarioList = [];
  userUid: string;

  constructor(

    private authService: AuthService,
    public inventarioService: InventarioService
  ) { }

  filterRegistro = '';

  ngOnInit() {
    this.getRole();

    this.inventarioService.getInventario()
      .subscribe(list => {
        this.inventarioList = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      }
    );
  }

  onDelete($key: string) {
    if (confirm('¿Estas seguro de que quieres elimnarlo?')){
      this.inventarioService.deleteInventario($key);
    }
  }

  getRole() {
    this.authService.isAuth2().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUser(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole).admin;
        });
      }
    });
  }

  newInventario() {
    this.inventarioService.inventarioForm.reset();
    this.inventarioService.imageList = [];
    this.inventarioService.selectedInventario = new Inventario();
  }
}
