import { TestBed } from '@angular/core/testing';

import { StrictlyTypedMatDialogService } from './strictly-typed-mat-dialog.service';

describe('StrictlyTypedMatDialogService', () => {
  let service: StrictlyTypedMatDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrictlyTypedMatDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
