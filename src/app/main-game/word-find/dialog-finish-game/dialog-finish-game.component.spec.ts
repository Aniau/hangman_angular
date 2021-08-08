import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFinishGameComponent } from './dialog-finish-game.component';

describe('DialogFinishGameComponent', () => {
  let component: DialogFinishGameComponent;
  let fixture: ComponentFixture<DialogFinishGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFinishGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFinishGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
