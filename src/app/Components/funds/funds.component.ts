import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../Services/socket.service/socket.service.service';
import {
  OwnerBalance,
  OwnerBalanceService,
} from '../../Services/ownerBalance/owner-balance.service';
import {
  PayoutRequest,
  PayoutRequestService,
} from '../../Services/payout-request/payout-request.service';
import { PaypalService } from '../../Services/paypal/paypal.service';
import { AdminService } from '../../Services/Admin/admin.service';

interface OwnerDetails {
  firstName: string;
  lastName: string;
  _id: string;
}

interface PayoutNotification {
  type: 'PAYOUT_REQUEST';
  data: {
    paypalEmail: string;
    amount: number;
  };
}

declare var bootstrap: any;

@Component({
  selector: 'app-funds',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './funds.component.html',
  styleUrl: './funds.component.css',
})
export class FundsComponent implements OnInit, OnDestroy {
  Math = Math;
  notification: PayoutNotification | null = null;
  payoutRequests: PayoutRequest[] = [];
  ownerBalance: OwnerBalance[] = [];
  balanceOwners: OwnerDetails[] = [];
  payoutOwners: OwnerDetails[] = [];
  ownerId: string = '';
  private toast: any;
  private successAlert: any;
  private notificationAlert: any;

  constructor(
    private socketService: SocketService,
    private ownerBalanceService: OwnerBalanceService,
    private payoutService: PayoutRequestService,
    private paypalService: PaypalService,
    private adminService: AdminService
  ) {
    this.socketService.notification$.subscribe((notification) => {
      if (notification) {
        this.notification = {
          type: 'PAYOUT_REQUEST',
          data: notification,
        };
        console.log(notification);
        this.showNotification();
        this.getAllPayoutRequests();
      }
    });
  }

  ngOnInit() {
    this.getOwnerBalance();
    this.getAllPayoutRequests();
    this.notificationAlert = document.getElementById('liveToast');
    this.successAlert = document.getElementById('successAlert');
  }

  getOwnerBalance() {
    this.ownerBalanceService.getAllBalances().subscribe((res) => {
      this.ownerBalance = res;
      this.balanceOwners = [];
      res.forEach((balance) => {
        this.adminService
          .getUserDetails(balance.owner_id)
          .subscribe((ownerDetails: any) => {
            this.balanceOwners.push(ownerDetails);
          });
      });
    });
  }

  getAllPayoutRequests() {
    this.payoutService.getAllPayoutRequests().subscribe((res) => {
      this.payoutRequests = res;
      this.payoutOwners = [];
      res.forEach((payout) => {
        this.adminService
          .getUserDetails(payout.owner_id)
          .subscribe((ownerDetails: any) => {
            this.payoutOwners.push(ownerDetails);
          });
      });
    });
  }

  createPayoutOrder() {
    this.paypalService.createPayout({
      amount: 100,
      paypalEmail: 'test@test.com',
      payoutRequestId: '123',
    });
  }

  private showNotification() {
    if (
      this.notification?.type === 'PAYOUT_REQUEST' &&
      this.notificationAlert
    ) {
      this.notificationAlert.classList.add('show');
      setTimeout(() => {
        this.notificationAlert.classList.remove('show');
      }, 5000);
    }
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  capturePayoutRequest(payout: PayoutRequest) {
    payout.isLoading = true;

    this.paypalService
      .createPayout({
        amount: payout.amount,
        paypalEmail: payout.payment_reference,
        payoutRequestId: payout._id,
      })
      .subscribe({
        next: (response) => {
          if (response.batch_header?.payout_batch_id) {
            this.monitorPayoutStatus(
              response.batch_header.payout_batch_id,
              payout
            );
          } else {
            console.error('Invalid PayPal payout response:', response);
            payout.isLoading = false;
          }
        },
        error: (error) => {
          console.error('Error creating PayPal payout:', error);
          payout.isLoading = false;
        },
      });
  }

  private monitorPayoutStatus(batchId: string, payout: PayoutRequest) {
    const checkStatus = () => {
      this.paypalService.getPayoutStatus(batchId).subscribe({
        next: (statusResponse) => {
          const status = statusResponse.batch_header.batch_status;
          console.log('Current payout status:', status);

          switch (status) {
            case 'SUCCESS':
              this.updatePayoutAndBalance(payout);
              console.log('Payout successful:', statusResponse);
              break;
            case 'PENDING':
            case 'PROCESSING':
              setTimeout(checkStatus, 5000);
              break;
            case 'DENIED':
            case 'FAILED':
              console.error('Payout failed:', statusResponse);
              break;
            default:
              console.log('Unexpected status:', status);
              setTimeout(checkStatus, 5000);
          }
        },
        error: (error) => {
          console.error('Error checking payout status:', error);
        },
      });
    };
    checkStatus();
  }

  private updatePayoutAndBalance(payout: PayoutRequest) {
    this.payoutService
      .updatePayoutRequest(payout._id, {
        status: 'PAID',
        payment_date: new Date(),
      })
      .subscribe(() => {
        payout.isLoading = false; // Reset loading state
        const ownerBalance = this.ownerBalance.find(
          (b) => b.owner_id === payout.owner_id
        );
        if (ownerBalance) {
          this.ownerBalanceService
            .updateBalance(payout.owner_id, {
              current_balance: ownerBalance.current_balance - payout.amount,
              total_paid: ownerBalance.total_paid + payout.amount,
            })
            .subscribe(() => {
              this.getOwnerBalance();
              this.getAllPayoutRequests();
              this.showSuccessAlert();
            });
        }
      });
  }

  private showSuccessAlert() {
    if (this.successAlert) {
      this.successAlert.classList.remove('d-none');
      setTimeout(() => {
        this.successAlert.classList.add('d-none');
      }, 3000);
    }
  }
}
