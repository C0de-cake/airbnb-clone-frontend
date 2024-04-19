import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InfoStepComponent} from './info-step.component';

describe('InfoStepComponent', () => {
  let component: InfoStepComponent;
  let fixture: ComponentFixture<InfoStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
