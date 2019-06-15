import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousWorkPage } from './previous-work.page';

describe('PreviousWorkPage', () => {
  let component: PreviousWorkPage;
  let fixture: ComponentFixture<PreviousWorkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousWorkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousWorkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
