import {Component, EventEmitter, input, Output} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-info-step-control',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './info-step-control.component.html',
  styleUrl: './info-step-control.component.scss'
})
export class InfoStepControlComponent {

  title = input.required<string>();
  value = input.required<number>();
  minValue = input<number>(0);

  @Output()
  valueChange = new EventEmitter<number>();

  separator = input<boolean>(true);

  onIncrement() {
    this.valueChange.emit(this.value() + 1);
  }

  onDecrement() {
    this.valueChange.emit(this.value() - 1);
  }

}
