// import { Component, OnInit } from '@angular/core';
// import { Chart, registerables } from 'chart.js';

// @Component({
//   selector: 'app-visitor-chart',
//   templateUrl: './visitors-chart.component.html',
//   styleUrls: ['./visitors-chart.component.css']
// })
// export class VisitorChartComponent implements OnInit {
//   chart: any;

//   constructor() {
//     Chart.register(...registerables);
//   }

//   ngOnInit(): void {
//     setTimeout(() => {
//       this.createChart();
//     }, 0);
//   }


//   createChart() {
//     this.chart = new Chart('canvas', {
//       type: 'line',
//       data: {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//         datasets: [{
//           label: 'namber of visitors',
//           data: [65, 59, 80, 81, 56, 55, 40],
//           borderColor: 'rgba(75, 192, 192, 1)',
//           backgroundColor: 'rgba(75, 192, 192, 0.2)',
//           borderWidth: 1
//         }]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         }
//       }
//     });
//   }
// }
// =========================
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';

Chart.register(...registerables);

interface VisitorData {
  labels: (string | null)[]; 
  visitors: (number | null)[]; 
}

@Component({
  selector: 'app-visitor-chart',
  templateUrl: './visitors-chart.component.html',
  styleUrls: ['./visitors-chart.component.css']
})
export class VisitorChartComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;
  chart: Chart | null = null;

  constructor(private httpclient: HttpClient) { }

  ngOnInit(): void {
    this.fetchVisitorData();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private fetchVisitorData(): void {
    this.httpclient.get<VisitorData>(`http://localhost:3000/visitor`).subscribe(
      data => {
        console.log(' data is:', data);
        
        if (!Array.isArray(data.labels) || !Array.isArray(data.visitors)) {
          console.error('  data is not array:', data);
          return;
        }

        const validLabels = data.labels.filter(label => label !== null) as string[];
        const validVisitors = data.visitors.filter(visitor => visitor !== null) as number[];

        if (validLabels.length === 0 || validVisitors.length === 0 || validLabels.length !== validVisitors.length) {
          console.error('  data is not found');
          return;
        }

        this.createChart(validLabels, validVisitors);
      },
      error => {
        console.error('err:', error);
      }
    );
  }

  private createChart(labels: string[], visitors: number[]): void {
    const ctx = this.canvasRef.nativeElement.getContext('2d');

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: ' namber of visitors',
          data: visitors,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}



