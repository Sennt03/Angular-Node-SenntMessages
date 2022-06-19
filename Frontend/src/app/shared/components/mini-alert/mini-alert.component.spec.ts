import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniAlertComponent } from './mini-alert.component';

describe('MiniAlertComponent', () => {
  let component: MiniAlertComponent;
  let fixture: ComponentFixture<MiniAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
