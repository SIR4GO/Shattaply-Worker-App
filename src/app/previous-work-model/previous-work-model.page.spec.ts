import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousWorkModelPage } from './previous-work-model.page';

describe('PreviousWorkModelPage', () => {
  let component: PreviousWorkModelPage;
  let fixture: ComponentFixture<PreviousWorkModelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousWorkModelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousWorkModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
