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

Chart.register(...registerables);

interface VisitorData {
  labels: (string | null)[];
  visitors: (number | null)[];
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
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
  constructor(
    private httpclient: HttpClient,
    private jwtService: JWTService,
    private adminService: AdminService,
    private financialsService: FinancialsService
  ) {}

  ngOnInit(): void {
    this.fetchVisitorData();
    this.fetchFinancials();
    this.adminId = this.jwtService.decodeToken(
      localStorage.getItem('token') || ''
    ).id;
    this.fetchUserDetails();
    console.log(this.adminId);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
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
}
