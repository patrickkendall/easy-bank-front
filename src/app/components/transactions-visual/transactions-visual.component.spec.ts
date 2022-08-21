import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsVisualComponent } from './transactions-visual.component';

describe('TransactionsVisualComponent', () => {
  let component: TransactionsVisualComponent;
  let fixture: ComponentFixture<TransactionsVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsVisualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
