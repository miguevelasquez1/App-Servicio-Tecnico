import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { RegistroService } from './registro.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  public points: Array<number>;
  private userUid: string;

  constructor(
    private registroService: RegistroService,
    private authService: AuthService
  ) {
    this.points = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  getPoints() {

    return this.points;
  }

  addPoint(month: number) {
    this.points[month]++;
  }

  deletePoint(date: string) {
    const yearNow = new Date().getFullYear();
    const rutaDate = new Date(date);
    const month = rutaDate.getMonth();
    const year = rutaDate.getFullYear();

    if (year === yearNow) {
      this.points[month] -= 1;
    }
  }

}
