import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InfoStepControlComponent} from './info-step-control.component';

describe('InfoStepControlComponent', () => {
  let component: InfoStepControlComponent;
  let fixture: ComponentFixture<InfoStepControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoStepControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoStepControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
