import { Component, OnInit } from '@angular/core';
import { HomePage } from 'src/app/home/home.page';

@Component({
  selector: 'app-industriales',
  templateUrl: './industriales.component.html',
  styleUrls: ['./industriales.component.scss'],
})
export class IndustrialesComponent implements OnInit {

  constructor(
    public homePage: HomePage
  ) { }

  ngOnInit() {}

}
