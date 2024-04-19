import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FooterStepComponent} from './footer-step.component';

describe('FooterStepComponent', () => {
  let component: FooterStepComponent;
  let fixture: ComponentFixture<FooterStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
