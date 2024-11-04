import { Injectable } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { Booking } from '../booking/booking.service';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  prepareBookingChartData(bookings: Booking[]): {
    labels: string[];
    data: number[];
  } {
    const sortedBookings = bookings
      .map((booking) => ({
        date: new Date(booking.booking_date).toLocaleDateString(),
        amount: booking.commission.amount,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      labels: sortedBookings.map((booking) => booking.date),
      data: sortedBookings.map((booking) => booking.amount),
    };
  }

  createBookingChart(
    ctx: CanvasRenderingContext2D,
    labels: string[],
    data: number[]
  ): Chart {
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Commission Amount',
            data: data,
            borderColor: 'rgba(26, 76, 243, 1)',
            backgroundColor: 'rgba(26, 76, 243, 0.2)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Commission Amount ($)',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Booking Date',
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
