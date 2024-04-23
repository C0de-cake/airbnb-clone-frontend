import {Component, inject} from '@angular/core';
import {Step} from "../../landlord/properties-create/step.model";
import {Search} from "./search.model";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {Router} from "@angular/router";
import {BookedDatesDTOFromServer} from "../model/booking.model";
import {NewListingInfo} from "../../landlord/model/listing.model";
import dayjs from "dayjs";
import {
  LocationMapComponent
} from "../../landlord/properties-create/step/location-step/location-map/location-map.component";
import {FooterStepComponent} from "../../shared/footer-step/footer-step.component";
import {SearchDateComponent} from "./search-date/search-date.component";
import {InfoStepComponent} from "../../landlord/properties-create/step/info-step/info-step.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    LocationMapComponent,
    FooterStepComponent,
    SearchDateComponent,
    InfoStepComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  LOCATION = "location";
  DATES = "dates";
  GUESTS = "guests";

  steps: Step[] = [
    {
      id: this.LOCATION,
      idNext: this.DATES,
      idPrevious: null,
      isValid: false
    },
    {
      id: this.DATES,
      idNext: this.GUESTS,
      idPrevious: this.LOCATION,
      isValid: false
    },
    {
      id: this.GUESTS,
      idNext: null,
      idPrevious: this.DATES,
      isValid: false
    }
  ];

  currentStep = this.steps[0];

  newSearch: Search = {
    dates: {
      startDate: new Date(),
      endDate: new Date(),
    },
    infos: {
      guests: {value: 0},
      bedrooms: {value: 0},
      beds: {value: 0},
      baths: {value: 0}
    },
    location: ""
  };

  loadingSearch = false;

  dialogDynamicRef = inject(DynamicDialogRef);
  router = inject(Router);

  nextStep() {
    if (this.currentStep.idNext !== null) {
      this.currentStep = this.steps.filter((step: Step) => step.id === this.currentStep.idNext)[0];
    }
  }

  previousStep() {
    if (this.currentStep.idPrevious !== null) {
      this.currentStep = this.steps.filter((step: Step) => step.id === this.currentStep.idPrevious)[0];
    }
  }

  isAllStepsValid() {
    return this.steps.filter(step => step.isValid).length === this.steps.length;
  }

  onValidityChange(validity: boolean) {
    this.currentStep.isValid = validity;
  }

  onNewLocation(newLocation: string): void {
    this.currentStep.isValid = true;
    this.newSearch.location = newLocation;
  }

  onNewDate(newDates: BookedDatesDTOFromServer) {
    this.newSearch.dates =  newDates
  }

  onInfoChange(newInfo: NewListingInfo) {
    this.newSearch.infos = newInfo;
  }

  search() {
    this.loadingSearch = false;
    this.router.navigate(["/"],
      {
        queryParams: {
          location: this.newSearch.location,
          guests: this.newSearch.infos.guests.value,
          bedrooms: this.newSearch.infos.bedrooms.value,
          beds: this.newSearch.infos.beds.value,
          baths: this.newSearch.infos.baths.value,
          startDate: dayjs(this.newSearch.dates.startDate).format("YYYY-MM-DD"),
          endDate: dayjs(this.newSearch.dates.endDate).format("YYYY-MM-DD"),
        }
      });
    this.dialogDynamicRef.close();
  }
}
