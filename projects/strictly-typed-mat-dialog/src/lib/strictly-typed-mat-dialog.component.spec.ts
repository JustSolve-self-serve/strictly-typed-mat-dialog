import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrictlyTypedMatDialogComponent } from './strictly-typed-mat-dialog.component';

describe('StrictlyTypedMatDialogComponent', () => {
  let component: StrictlyTypedMatDialogComponent;
  let fixture: ComponentFixture<StrictlyTypedMatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrictlyTypedMatDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrictlyTypedMatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
