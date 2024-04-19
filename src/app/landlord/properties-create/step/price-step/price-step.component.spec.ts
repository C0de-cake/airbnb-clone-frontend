import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PriceStepComponent} from './price-step.component';

describe('PriceStepComponent', () => {
  let component: PriceStepComponent;
  let fixture: ComponentFixture<PriceStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
