import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchDateComponent} from './search-date.component';

describe('SearchDateComponent', () => {
  let component: SearchDateComponent;
  let fixture: ComponentFixture<SearchDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
