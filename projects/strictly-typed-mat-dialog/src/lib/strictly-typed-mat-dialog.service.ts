import { inject, Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { StrictlyTypedMatDialog } from './strictly-typed-mat-dialog';

@Injectable({
  providedIn: 'root'
})
export class StrictlyTypedMatDialogService {
  dialog = inject(MatDialog);

  open<DialogData, DialogResult>(
    component: Type<StrictlyTypedMatDialog<DialogData, DialogResult>>,
    config?: MatDialogConfig<NoInfer<DialogData>>
  ): MatDialogRef<StrictlyTypedMatDialog<DialogData, DialogResult>, DialogResult> {
    return this.dialog.open(component, config);
  }
}