import { Component, OnInit } from '@angular/core';
import { HomePage } from 'src/app/home/home.page';

@Component({
  selector: 'app-comerciales',
  templateUrl: './comerciales.component.html',
  styleUrls: ['./comerciales.component.scss'],
})
export class ComercialesComponent implements OnInit {

  constructor(
    public homePage: HomePage
  ) { }

  ngOnInit() {}

}
