// import { Component } from '@angular/core';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { JWTService } from '../../Services/Jwt/jwt.service';
import { AdminService } from '../../Services/Admin/admin.service';
import { FinancialsService } from '../../Services/Financials/financials.service';
import { BookingService } from '../../Services/booking/booking.service';
import { ChartService } from '../../Services/chart/chart.service';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

Chart.register(...registerables);

interface VisitorData {
  labels: (string | null)[];
  visitors: (number | null)[];
}

interface VisitorStats {
  _id: string;
  count: number;
}

interface AnalyticsData {
  visitors: Array<{
    device: string;
    path: string;
    timestamp: string;
  }>;
  deviceStats: VisitorStats[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;
  chart: Chart | null = null;
  adminId: string = '';
  userDetails: any;
  websiteFinancials: number = 0;
  bookingFinancials: number = 0;
  bookingChart: Chart | null = null;
  @ViewChild('bookingCanvas', { static: true }) bookingCanvasRef!: ElementRef;
  @ViewChild('deviceChart', { static: true }) deviceChartRef!: ElementRef;
  recentVisitors: any[] = [];
  private readonly API_URL = 'http://localhost:3000/visitor/analytics';
  private deviceChart: Chart<'doughnut', number[], string> | null = null;
  deviceStats: VisitorStats[] = [];

  constructor(
    private httpclient: HttpClient,
    private jwtService: JWTService,
    private adminService: AdminService,
    private financialsService: FinancialsService,
    private bookingService: BookingService,
    private chartService: ChartService
  ) {}

  ngOnInit(): void {
    this.fetchVisitorData();
    this.fetchFinancials();
    this.adminId = this.jwtService.decodeToken(
      localStorage.getItem('token') || ''
    ).id;
    this.fetchUserDetails();
    this.fetchBookingData();
    this.fetchAnalyticsData();
    console.log(this.adminId);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.bookingChart) {
      this.bookingChart.destroy();
    }
    if (this.deviceChart) {
      this.deviceChart.destroy();
    }
  }

  fetchUserDetails() {
    this.adminService.getUserDetails(this.adminId).subscribe(
      (data) => {
        this.userDetails = data;
        console.log('User Details:', this.userDetails);
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  fetchFinancials() {
    this.financialsService.getFinancials().subscribe((data) => {
      this.websiteFinancials = data
        .map((item: any) => item.website_commission)
        .reduce((acc: number, curr: number) => acc + curr, 0);
      this.bookingFinancials = data.length;
      console.log('Financials:', this.websiteFinancials);
      console.log('Booking Financials:', this.bookingFinancials);
    });
  }

  private fetchVisitorData(): void {
    this.httpclient.get<VisitorData>(`http://localhost:3000/visitor`).subscribe(
      (data) => {
        console.log('Raw response:', data);
        if (typeof data === 'string') {
          console.error(
            'Received string instead of expected VisitorData:',
            data
          );
          return;
        }
        console.log(' data is:', data);

        if (!Array.isArray(data.labels) || !Array.isArray(data.visitors)) {
          console.error('  data is not array:', data);
          return;
        }

        const validLabels = data.labels.filter(
          (label) => label !== null
        ) as string[];
        const validVisitors = data.visitors.filter(
          (visitor) => visitor !== null
        ) as number[];

        if (
          validLabels.length === 0 ||
          validVisitors.length === 0 ||
          validLabels.length !== validVisitors.length
        ) {
          console.error('  data is not found');
          return;
        }

        this.createChart(validLabels, validVisitors);
      },
      (error) => {
        console.error('Error fetching visitor data:', error);
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
        datasets: [
          {
            label: ' namber of visitors',
            data: visitors,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  private fetchBookingData(): void {
    this.bookingService.getAllBookings().subscribe(
      (bookings) => {
        console.log('bookings:', bookings);
        const { labels, data } =
          this.chartService.prepareBookingChartData(bookings);
        const ctx = this.bookingCanvasRef.nativeElement.getContext('2d');

        if (this.bookingChart) {
          this.bookingChart.destroy();
        }

        this.bookingChart = this.chartService.createBookingChart(
          ctx,
          labels,
          data
        );
      },
      (error) => {
        console.error('Error fetching booking data:', error);
      }
    );
  }

  private async fetchAnalyticsData() {
    this.httpclient
      .get<AnalyticsData>(this.API_URL)
      .pipe(
        catchError((error) => {
          console.error('Error fetching analytics:', error);
          return of({ visitors: [], deviceStats: [] });
        })
      )
      .subscribe((data) => {
        this.recentVisitors = data.visitors.slice(0, 10);
        this.deviceStats = data.deviceStats;
        this.initializeDeviceChart(data.deviceStats);
      });
  }

  private initializeDeviceChart(deviceStats: VisitorStats[]) {
    const canvas = this.deviceChartRef.nativeElement;
    if (!canvas) return;

    if (this.deviceChart) {
      this.deviceChart.destroy();
    }

    this.deviceChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: deviceStats.map((stat) => stat._id),
        datasets: [
          {
            data: deviceStats.map((stat) => stat.count),
            backgroundColor: [
              '#4390E1',
              '#51C931',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
            ].slice(0, deviceStats.length),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Visitor Device Distribution',
          },
        },
      },
    });
  }

  formatDate(timestamp: string): string {
    return new Date(timestamp).toLocaleString();
  }
}
