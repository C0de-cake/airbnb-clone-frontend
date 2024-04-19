import {Component, EventEmitter, input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {InfoStepControlComponent} from "./info-step-control/info-step-control.component";
import {NewListingInfo} from "../../../model/listing.model";

export type Control = "GUESTS" | "BEDROOMS" | "BEDS" | "BATHS"

@Component({
  selector: 'app-info-step',
  standalone: true,
  imports: [FormsModule, ButtonModule, FontAwesomeModule, InfoStepControlComponent],
  templateUrl: './info-step.component.html',
  styleUrl: './info-step.component.scss'
})
export class InfoStepComponent {

  infos = input.required<NewListingInfo>();

  @Output()
  infoChange = new EventEmitter<NewListingInfo>();

  @Output()
  stepValidityChange = new EventEmitter<boolean>();

  onInfoChange(newValue: number, valueType: Control) {
    switch (valueType) {
      case "BATHS":
        this.infos().baths = {value: newValue}
        break;
      case "BEDROOMS":
        this.infos().bedrooms = {value: newValue}
        break;
      case "BEDS":
        this.infos().beds = {value: newValue}
        break;
      case "GUESTS":
        this.infos().guests = {value: newValue}
        break
    }

    this.infoChange.emit(this.infos());
    this.stepValidityChange.emit(this.validationRules());
  }

  validationRules(): boolean {
    return this.infos().guests.value >= 1;
  }

}
