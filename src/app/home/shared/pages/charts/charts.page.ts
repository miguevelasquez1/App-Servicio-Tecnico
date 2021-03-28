import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements OnInit {

  /**
   * The ChartJS Object
   * @var {any} chart
   */
  public chartBar: Chart;
  /**
   * The ChartJS Object
   * @var {any} chart
   */
   public chartLineal: Chart;
  public speed = 250;

  constructor( ) { }

  ngOnInit() {
    Chart.defaults.global.defaultFontFamily = 'Poppins-Bold';
    Chart.defaults.line.spanGaps = true;

    const ctx = document.getElementById('lineal') as HTMLCanvasElement;
    const c = ctx.getContext('2d');

    const gradientStroke = c.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80b6f4');
    gradientStroke.addColorStop(1, '#f49080');

    this.chartLineal = new Chart('lineal', {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'S7', 'S8'],
        datasets: [{
          label: 'Rendimiento',
          data: [{
            x: 2,
            y: 3
          }, {
              x: 4,
              y: 5
          }, {
              x: 6,
              y: 7
          }],
          fill: false,
          borderColor: gradientStroke,
          pointBorderColor: gradientStroke,
          pointBackgroundColor: gradientStroke,
          pointHoverBackgroundColor: gradientStroke,
          pointHoverBorderColor: gradientStroke,
          borderWidth: 2
        }]
      },
      options: {
        scales: {
        // And this will affect the horizontal lines (yAxe) of your dataset
        yAxes: [{
            gridLines: {
              // You can change the color, the dash effect, the main axe color, etc.
              display: false,
              zeroLineWidth: 0
            }
        }]
      }
      }
    });

    this.chartBar = new Chart('bar', {
      type: 'bar',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Rendimiento',
          data: [2, 4, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        animation: {
          duration: this.speed * 1.5,
          easing: 'linear'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
