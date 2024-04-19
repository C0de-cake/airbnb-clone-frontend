import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PropertiesCreateComponent} from './properties-create.component';

describe('PropertiesCreateComponent', () => {
  let component: PropertiesCreateComponent;
  let fixture: ComponentFixture<PropertiesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
