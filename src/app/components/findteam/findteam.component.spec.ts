import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindteamComponent } from './findteam.component';

describe('FindteamComponent', () => {
  let component: FindteamComponent;
  let fixture: ComponentFixture<FindteamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindteamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
