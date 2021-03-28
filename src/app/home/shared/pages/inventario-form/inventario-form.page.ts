import { Component, OnInit } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-inventario-form',
  templateUrl: './inventario-form.page.html',
  styleUrls: ['./inventario-form.page.scss'],
})
export class InventarioFormPage implements OnInit {

  constructor(
    public inventarioService: InventarioService
  ) {}

  ngOnInit() {}
}
