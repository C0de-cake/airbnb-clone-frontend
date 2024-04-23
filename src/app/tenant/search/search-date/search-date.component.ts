import {Component, effect, EventEmitter, input, Output} from '@angular/core';
import {BookedDatesDTOFromServer} from "../../model/booking.model";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-search-date',
  standalone: true,
  imports: [
    CalendarModule,
    FormsModule
  ],
  templateUrl: './search-date.component.html',
  styleUrl: './search-date.component.scss'
})
export class SearchDateComponent {

  dates = input.required<BookedDatesDTOFromServer>();

  searchDateRaw = new Array<Date>();

  minDate = new Date();

  @Output()
  datesChange = new EventEmitter<BookedDatesDTOFromServer>();

  @Output()
  stepValidityChange = new EventEmitter<boolean>();

  onDateChange(newBookingDate: Date[]) {
    this.searchDateRaw = newBookingDate;
    const isDateValid = this.validateDateSearch();
    this.stepValidityChange.emit(isDateValid);

    if (isDateValid) {
      const searchDate: BookedDatesDTOFromServer = {
        startDate: this.searchDateRaw[0],
        endDate: this.searchDateRaw[1]
      }
      this.datesChange.emit(searchDate);
    }
  }

  private validateDateSearch() {
    return this.searchDateRaw.length === 2
      && this.searchDateRaw[0] !== null
      && this.searchDateRaw[1] !== null
      && this.searchDateRaw[0].getDate() !== this.searchDateRaw[1].getDate()
  }

  constructor() {
    this.restorePreviousDate();
  }

  private restorePreviousDate() {
    effect(() => {
      if(this.dates()) {
        this.searchDateRaw[0] = this.dates().startDate;
        this.searchDateRaw[1] = this.dates().endDate;
      }
    });
  }
}
