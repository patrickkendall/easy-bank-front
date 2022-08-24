import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsTypeComponent } from './transactions-type.component';

describe('TransactionsTypeComponent', () => {
  let component: TransactionsTypeComponent;
  let fixture: ComponentFixture<TransactionsTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
