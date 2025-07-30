// strictly-typed-mat-dialog.service.type-tests.ts
// This file is intentionally not a Jasmine spec.
// It should compile as part of the test build.
// Lines with @ts-expect-error MUST produce a compiler error, otherwise the build fails.

import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { StrictlyTypedMatDialog } from '../strictly-typed-mat-dialog';
import { StrictlyTypedMatDialogService } from '../strictly-typed-mat-dialog.service';

// Minimal standalone test components again (type-only assertions need them available)
interface ReqData { foo: string }
type OptData = { message: string } | undefined | null;
interface CampaignData { campaign?: { id: number } } // optional nested property, but top-level data is REQUIRED

@Component({ standalone: true, template: '', imports: [MatDialogModule] })
class NoDataDialog extends StrictlyTypedMatDialog<never, void> { }

@Component({ standalone: true, template: '', imports: [MatDialogModule] })
class OptionalDataDialog extends StrictlyTypedMatDialog<OptData, number> { }

@Component({ standalone: true, template: '', imports: [MatDialogModule] })
class RequiredDataDialog extends StrictlyTypedMatDialog<ReqData, string> { }

@Component({ standalone: true, template: '', imports: [MatDialogModule] })
class CampaignRequiredDialog extends StrictlyTypedMatDialog<CampaignData, { id: number }> { }

// Treat service as given — no runtime
declare const service: StrictlyTypedMatDialogService;

// ----- Helpers to assert types -----
type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false;
type Expect<T extends true> = T;

// ----- Allowed calls -----

// No-data dialogs: ok with no config
const refNoData = service.open(NoDataDialog);
type _NoDataRef = Expect<Equal<typeof refNoData, MatDialogRef<NoDataDialog, void>>>;

// Optional/nullable data dialogs: config optional & data optional
const refOpt0 = service.open(OptionalDataDialog);
const refOpt1 = service.open(OptionalDataDialog, { width: '300px' });
const refOpt2 = service.open(OptionalDataDialog, { data: null });
const refOpt3 = service.open(OptionalDataDialog, { data: { message: 'hi' } });

// Required data dialogs: must pass config with data of exact shape
const refReq = service.open(RequiredDataDialog, { data: { foo: 'x' } });
type _ReqRefTypeOk = Expect<Equal<typeof refReq, MatDialogRef<RequiredDataDialog, string>>>;

// Required even if inner fields are optional
const refCamp = service.open(CampaignRequiredDialog, { data: {} as CampaignData });
type _CampRefTypeOk = Expect<Equal<typeof refCamp, MatDialogRef<CampaignRequiredDialog, { id: number }>>>;

// ----- Disallowed calls (must FAIL to compile) -----

// Required data dialogs: missing config/data
// @ts-expect-error missing config/data must be rejected
service.open(RequiredDataDialog);

// @ts-expect-error width-only config must be rejected
service.open(RequiredDataDialog, { width: '300px' });

// @ts-expect-error wrong data shape
service.open(RequiredDataDialog, { data: { bar: 1 } });

// @ts-expect-error undefined is not assignable to ReqData
service.open(RequiredDataDialog, { data: undefined });

// Campaign data: top-level required even if inner fields optional
// @ts-expect-error still required to pass config with data
service.open(CampaignRequiredDialog);

// Optional/nullable data dialog: wrong data shape
// @ts-expect-error data has wrong shape
service.open(OptionalDataDialog, { data: { foo: 'x' } });

// No-data dialog: data must be forbidden
// @ts-expect-error data is not allowed when DialogData = never
service.open(NoDataDialog, { data: {} });

// Returned ref type should not be mis-assignable
// @ts-expect-error wrong result type in target
const _badAssign: MatDialogRef<RequiredDataDialog, number> = refReq;
