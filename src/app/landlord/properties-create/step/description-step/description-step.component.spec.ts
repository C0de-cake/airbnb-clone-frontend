import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DescriptionStepComponent} from './description-step.component';

describe('DescriptionStepComponent', () => {
  let component: DescriptionStepComponent;
  let fixture: ComponentFixture<DescriptionStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
