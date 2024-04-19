import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LocationMapComponent} from './location-map.component';

describe('LocationMapComponent', () => {
  let component: LocationMapComponent;
  let fixture: ComponentFixture<LocationMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
