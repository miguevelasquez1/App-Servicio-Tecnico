import { Component, OnInit } from '@angular/core';
import { Inventario } from 'src/app/models/inventario';
import { InventarioService } from '../../services/inventario.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  inventarioList: Inventario[];

  constructor(
    public inventarioService: InventarioService,
    private router: Router
  ) { }

  ngOnInit() {
    this.inventarioService.getInventario()
      .subscribe(item => {
        this.inventarioList = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.inventarioList.push(x as unknown as Inventario);
        });
      });
  }

  onSubmit(inventarioForm: NgForm) {
    if (inventarioForm.value.$key == null) {
      this.inventarioService.insertInventario(inventarioForm.value);
    } else {
      this.inventarioService.updateInventario(inventarioForm.value);
    }
    this.resetForm(inventarioForm);
  }

  resetForm(inventarioForm?: NgForm)
  {
    if (inventarioForm != null) {
      inventarioForm.reset();
      this.inventarioService.selectedInventario = new Inventario();
    }
  }

}
