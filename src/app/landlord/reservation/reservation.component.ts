import {Component, effect, inject, OnDestroy, OnInit} from '@angular/core';
import {ToastService} from "../../layout/toast.service";
import {BookingService} from "../../tenant/service/booking.service";
import {BookedListing} from "../../tenant/model/booking.model";
import {CardListingComponent} from "../../shared/card-listing/card-listing.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    CardListingComponent,
    FaIconComponent
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit, OnDestroy {

  bookingService = inject(BookingService);
  toastService = inject(ToastService);

  reservationListings = new Array<BookedListing>();

  loading = false;


  constructor() {
    this.listenToFetchReservation();
    this.listenToCancelReservation();
  }

  ngOnDestroy(): void {
    this.bookingService.resetCancel();
  }

  ngOnInit(): void {
    this.fetchReservation();
  }

  private fetchReservation() {
    this.loading = true;
    this.bookingService.getBookedListingForLandlord();
  }

  private listenToCancelReservation() {
    effect(() => {
      const cancelState = this.bookingService.cancelSig();
      if (cancelState.status === "OK") {
        const listingToDeleteIndex = this.reservationListings.findIndex(listing => listing.bookingPublicId === cancelState.value);
        this.reservationListings.splice(listingToDeleteIndex, 1);
        this.toastService.send({
          severity: "success", summary: "Successfully cancelled reservation",
        });
      } else if (cancelState.status === "ERROR") {
        const listingToDeleteIndex = this.reservationListings.findIndex(listing => listing.bookingPublicId === cancelState.value);
        this.reservationListings[listingToDeleteIndex].loading = false;
        this.toastService.send({
          severity: "error", summary: "Error when canceling reservation",
        });
      }
    });
  }

  private listenToFetchReservation() {
    effect(() => {
      const reservedListingsState = this.bookingService.getBookedListingForLandlordSig();
      if (reservedListingsState.status === "OK") {
        this.loading = false;
        this.reservationListings = reservedListingsState.value!;
      } else if(reservedListingsState.status === "ERROR") {
        this.loading = false;
        this.toastService.send({
          severity: "error", summary: "Error when fetching the reservation",
        });
      }
    });
  }

  onCancelReservation(reservation: BookedListing): void {
    reservation.loading = true;
    this.bookingService.cancel(reservation.bookingPublicId, reservation.listingPublicId, true);
  }
}
