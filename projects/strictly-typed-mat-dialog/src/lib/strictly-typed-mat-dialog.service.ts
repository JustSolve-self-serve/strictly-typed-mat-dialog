import { inject, Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { StrictlyTypedMatDialog } from './strictly-typed-mat-dialog';


type ExtractData<C> = C extends StrictlyTypedMatDialog<infer D, any> ? D : never;
type ExtractResult<C> = C extends StrictlyTypedMatDialog<any, infer R> ? R : never;

type WithRequiredData<D> = Omit<MatDialogConfig<D>, 'data'> & { data: D };
type WithOptionalData<D> = Omit<MatDialogConfig<D>, 'data'> & { data?: D };
type WithoutData = Omit<MatDialogConfig<never>, 'data'> & { data?: never };

// Decide the "config" parameter shape based on C's DialogData
type ArgsFor<C> =
  // No data at all
  ExtractData<C> extends never
  ? [config?: WithoutData]
  // Data type includes undefined -> config optional, data optional
  : undefined extends ExtractData<C>
  ? [config?: WithOptionalData<NoInfer<ExtractData<C>>>]
  // Data type includes null -> config optional, data optional
  : null extends ExtractData<C>
  ? [config?: WithOptionalData<NoInfer<ExtractData<C>>>]
  // Otherwise data is required
  : [config: WithRequiredData<NoInfer<ExtractData<C>>>];

@Injectable({ providedIn: 'root' })
export class StrictlyTypedMatDialogService {
  private readonly dialog = inject(MatDialog);

  // Single public signature that enforces config/data strictly
  open<C extends StrictlyTypedMatDialog<any, any>>(
    component: Type<C>,
    ...args: ArgsFor<C>
  ): MatDialogRef<C, ExtractResult<C>>;

  // Implementation (erased)
  open(component: Type<any>, config?: MatDialogConfig<any>): MatDialogRef<any, any> {
    return this.dialog.open(component, config);
  }
}