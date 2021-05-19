import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroService } from 'src/app/services/registro.service';
import { ChartService } from '../../../../services/chart.service';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage {

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
  private userUid: string;
  private points: Array<number>;

  @ViewChild('linealChart') linealChart: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart') barChart: ElementRef<HTMLCanvasElement>;
  constructor(
    private chartService: ChartService,
    private authService: AuthService,
    private registroService: RegistroService
  ) {
  }

  ionViewDidEnter() {

    this.points = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    Chart.defaults.global.defaultFontFamily = 'Poppins-Medium';
    Chart.defaults.global.defaultFontSize = 12;
    Chart.defaults.line.spanGaps = true;

    this.createLinealChart();

    this.createChartBar();

    this.getData();

  }

  getData() {
    this.authService.isAuth2().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.registroService.getRegistros()
          .subscribe(list => {
            list.map(item => {
              if (item.payload.val().userUid === this.userUid) {
                const month = new Date(item.payload.val().fecha).getMonth();
                this.points[month]++;
                this.chartService.points = this.points;
              }
            });
          });
      }
    });
    console.log(this.points);
    return this.points;
  }

  createLinealChart() {
    const ctx = this.linealChart.nativeElement.getContext('2d');

    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80b6f4');
    gradientStroke.addColorStop(1, '#f49080');

    this.chartLineal = new Chart(this.linealChart.nativeElement , {
      type: 'line',
      data: {
        labels: [
          'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
        ],
        datasets: [{
          label: 'Mis Rutas',
          data: this.chartService.getPoints(),
          fill: false,
          borderColor: gradientStroke,
          pointBorderColor: gradientStroke,
          pointBackgroundColor: gradientStroke,
          pointHoverBackgroundColor: gradientStroke,
          pointHoverBorderColor: gradientStroke,
          borderWidth: 2,
          pointRadius: 1,
          pointHoverRadius: 3
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
              },
              ticks: {
                  stepSize: 10
              }
          }]
        }
      }
    });
  }

  private createChartBar() {
    this.chartBar = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Viewers in millions',
          data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: 'rgb(38, 194, 129)',
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 10
            }
          }]
        }
      }
    });
  }

}
