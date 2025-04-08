import { Component } from '@angular/core';
import { StrictlyTypedMatDialog } from '../strictly-typed-mat-dialog';

@Component({
    selector: 'lib-test-dialog',
    template: `<h1>Test Dialog</h1>
             <button (click)="confirm()">Confirm</button>`
})
export class TestDialogComponent extends StrictlyTypedMatDialog<{ message: string }, string> {
    confirm() {
        this.dialogRef.close('Confirmed');
    }
}