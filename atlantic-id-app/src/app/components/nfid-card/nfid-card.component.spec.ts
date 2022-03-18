import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfidCardComponent } from './nfid-card.component';

describe('NfidCardComponent', () => {
  let component: NfidCardComponent;
  let fixture: ComponentFixture<NfidCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NfidCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfidCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
