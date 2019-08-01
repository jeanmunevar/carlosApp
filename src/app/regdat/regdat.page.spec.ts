import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegdatPage } from './regdat.page';

describe('RegdatPage', () => {
  let component: RegdatPage;
  let fixture: ComponentFixture<RegdatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegdatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegdatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
