# StrictlyTypedMatDialog

A type-safe wrapper for Angular Material's MatDialog service that ensures complete type safety for dialog components, their data, and return values.

## Features

- Full type safety for dialog component, input data, and return values
- Compatible with existing Angular Material Dialog API
- Zero runtime overhead
- Improved developer experience with better IntelliSense support

## Installation

```bash
npm install strictly-typed-mat-dialog
```

## Usage

### 1. Import the service

```typescript
import { StrictlyTypedMatDialogService } from 'strictly-typed-mat-dialog';
```

### 2. Define your dialog component

```typescript
import { Component } from '@angular/core';
import { StrictlyTypedMatDialog } from 'strictly-typed-mat-dialog';

@Component({
    selector: 'app-example-dialog',
    template: `<h1>{{data.message}}</h1>
             <button (click)="confirm()">Confirm</button>`
})
export class ExampleDialogComponent extends StrictlyTypedMatDialog<{ message: string }, string> {
    confirm() {
        this.dialogRef.close('Confirmed');
    }
}
```

### 3. Use the dialog service

```typescript
constructor(private dialog: StrictlyTypedMatDialogService) {}

openDialog() {
    const config = { data: { message: 'Hello World' } };
    const dialogRef = this.dialog.open(ExampleDialogComponent, config);
    
    dialogRef.afterClosed().subscribe((result: string) => {
        // result is properly typed as string
        console.log(result); // Will be 'Confirmed' when confirmed
    });
}
```

## Benefits

1. **Compile-time Type Safety**
   - Catch errors before runtime
   - No more typos in data property names
   - Ensure all required dialog data is provided

2. **Better Developer Experience**
   - Full IntelliSense support
   - Autocomplete for dialog data properties
   - Clear contract between dialog and parent component

3. **Maintainability**
   - Refactoring is safer
   - Changes to dialog interfaces are immediately flagged
   - Better code documentation through types

## API

### StrictlyTypedMatDialogService

#### open<T extends StrictlyTypedMatDialog<D, R>, D, R>(component: ComponentType<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R>

- `T`: The dialog component type (must extend StrictlyTypedMatDialog)
- `D`: The type of the dialog data
- `R`: The type of the result when the dialog is closed

## License

MIT
