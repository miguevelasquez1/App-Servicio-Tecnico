import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, ...arg: unknown[]): any {
    const resultRegistros = [];
    for (const registro of value) {
      if (registro.nombreTecnico.indexOf(arg) > -1 ||
        registro.nombreCliente.indexOf(arg) > -1 ||
        registro.fecha.indexOf(arg) > 1 ||
        registro.userName.indexOf(arg) > 1 ||
        registro.servicio.indexOf(arg) > 1 ||
        registro.direccion.indexOf(arg) > 1) {
        resultRegistros.push(registro);
      }
    }
    return resultRegistros;
  }

}
