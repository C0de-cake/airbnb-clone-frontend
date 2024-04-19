import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PictureStepComponent} from './picture-step.component';

describe('PictureStepComponent', () => {
  let component: PictureStepComponent;
  let fixture: ComponentFixture<PictureStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PictureStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
