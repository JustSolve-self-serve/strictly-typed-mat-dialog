import { inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export abstract class StrictlyTypedMatDialog<DialogData, DialogResult> {
    protected data: DialogData = inject(MAT_DIALOG_DATA);
    protected dialogRef: MatDialogRef<StrictlyTypedMatDialog<DialogData, DialogResult>, DialogResult> =
        inject(MatDialogRef);
}