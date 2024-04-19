import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardListingComponent} from './card-listing.component';

describe('CardListingComponent', () => {
  let component: CardListingComponent;
  let fixture: ComponentFixture<CardListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
