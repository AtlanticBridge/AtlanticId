import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavhubComponent } from './navhub.component';

describe('NavhubComponent', () => {
  let component: NavhubComponent;
  let fixture: ComponentFixture<NavhubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavhubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavhubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
