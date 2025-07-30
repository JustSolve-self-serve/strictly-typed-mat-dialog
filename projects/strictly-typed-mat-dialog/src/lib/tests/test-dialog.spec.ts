// --- One-time Angular testing environment init for this spec file ---
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

beforeAll(() => {
  // Safe to call once per spec file; ignore the error if already initialized by another spec.
  try {
    TestBed.initTestEnvironment(
      BrowserTestingModule,
      platformBrowserTesting(),
      { teardown: { destroyAfterEach: true } }
    );
  } catch {
    // noop
  }
});

// --- Actual spec contents below ---

import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { StrictlyTypedMatDialog } from '../strictly-typed-mat-dialog';
import { StrictlyTypedMatDialogService } from '../strictly-typed-mat-dialog.service';

// ---- Test dialog types ----
interface ReqData { foo: string }
type OptData = { message: string } | undefined | null;

// ---- No-data dialog ----
@Component({
  standalone: true,
  template: `<div>No data</div>`,
  imports: [MatDialogModule],
})
class NoDataDialog extends StrictlyTypedMatDialog<never, void> { }

// ---- Optional/nullable data dialog ----
@Component({
  standalone: true,
  template: `<div>Optional data</div>`,
  imports: [MatDialogModule],
})
class OptionalDataDialog extends StrictlyTypedMatDialog<OptData, number> { }

// ---- Required data dialog ----
@Component({
  standalone: true,
  template: `<div>Required data</div>`,
  imports: [MatDialogModule],
})
class RequiredDataDialog extends StrictlyTypedMatDialog<ReqData, string> { }

describe('StrictlyTypedMatDialogService (runtime)', () => {
  let service: StrictlyTypedMatDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule, // or use provideNoopAnimations() in providers
        MatDialogModule,
        NoDataDialog,
        OptionalDataDialog,
        RequiredDataDialog,
      ],
      providers: [StrictlyTypedMatDialogService],
    }).compileComponents();

    service = TestBed.inject(StrictlyTypedMatDialogService);
  });

  it('opens a no-data dialog without config', (done) => {
    const ref = service.open(NoDataDialog);
    ref.close();
    ref.afterClosed().subscribe(result => {
      expect(result).toBeUndefined(); // R = void
      done();
    });
  });

  it('opens an optional-data dialog with no config', (done) => {
    const ref = service.open(OptionalDataDialog);
    ref.close(123);
    ref.afterClosed().subscribe(result => {
      expect(result).toBe(123); // R = number
      done();
    });
  });

  it('opens an optional-data dialog with width-only config', (done) => {
    const ref = service.open(OptionalDataDialog, { width: '400px' });
    ref.close(7);
    ref.afterClosed().subscribe(result => {
      expect(result).toBe(7);
      done();
    });
  });

  it('opens an optional-data dialog with explicit null data', (done) => {
    const ref = service.open(OptionalDataDialog, { data: null });
    ref.close(1);
    ref.afterClosed().subscribe(result => {
      expect(result).toBe(1);
      done();
    });
  });

  it('opens a required-data dialog only when data is provided', (done) => {
    const ref = service.open(RequiredDataDialog, { data: { foo: 'bar' } });
    ref.close('ok');
    ref.afterClosed().subscribe(result => {
      expect(result).toBe('ok'); // R = string
      done();
    });
  });
});
