# StrictlyTypedMatDialog

## The Problem

In Angular Material’s current implementation of MatDialog, you must manually specify type parameters even though the dialog component already carries its own type definitions. For example:

```typescript
// Before:
const dialogRef = this.dialog.open<ADialogComponent, any, ReturnTypeHere>(ADialogComponent, { data: { ... } });
// You must specify the return type manually, resulting in potential mistakes:
dialogRef.afterClosed().subscribe((result: any) => { console.log(result); });
```

This creates two main issues:
- Redundancy & Decoupling: The component’s type for input data and return value is declared in two places, risking mismatches.
- Loss of Inference: The type system cannot automatically infer the dialog’s data and result types, leading to weakly typed (or even "any") outcomes in afterClosed().

The StrictlyTypedMatDialog library solves these problems by deriving type information directly from the dialog component, ensuring consistency and reducing redundancy.

A type-safe wrapper for Angular Material's MatDialog service that ensures complete type safety for dialog components, their data, and return values.

## Before vs. After

### Before
Without strict typing, you might write:

```typescript
// Before:
const dialogRef = this.dialog.open(ExampleDialogComponent, { data: { message: 'Hello World' } });
// Result type is not enforced and defaults to any:
dialogRef.afterClosed().subscribe((result: any) => { console.log(result); });

//but even a line like this still compiles, which is crazy:
dialogRef.afterClosed().subscribe((result: IOtherUnrelatedType) => { console.log(result); }); // this should be a compile error, but it actually isn't.
```

### After
With StrictlyTypedMatDialog, the types are inferred from the component:

```typescript
// After:
const dialogRef = this.dialog.open(ExampleDialogComponent, { data: { message: 'Hello World' } });
// Result type is automatically inferred (e.g., string) from the component’s declaration:
dialogRef.afterClosed().subscribe((result: string) => { console.log(result); });

// this is now correctly recognized as a compile error: the type is mismatched from the actual definition in the component.
dialogRef.afterClosed().subscribe((result: IOtherUnrelatedType) => { console.log(result); }); 

```

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
