import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvSmsPage } from './env-sms.page';

describe('EnvSmsPage', () => {
  let component: EnvSmsPage;
  let fixture: ComponentFixture<EnvSmsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvSmsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvSmsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
