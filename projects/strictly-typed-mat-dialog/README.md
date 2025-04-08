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

### 1. Import the module

```typescript
import { StrictlyTypedMatDialog } from 'strictly-typed-mat-dialog';

@NgModule({
  imports: [
    StrictlyTypedMatDialog,
    // ... other imports
  ]
})
export class AppModule { }
```

### 2. Define your dialog component with proper typing

```typescript
// example-dialog.component.ts
interface DialogData {
  title: string;
  message: string;
}

interface DialogResult {
  accepted: boolean;
}

@Component({
  selector: 'app-example-dialog',
  template: `
    <h2>{{data.title}}</h2>
    <p>{{data.message}}</p>
    <button (click)="dialogRef.close({accepted: true})">Accept</button>
    <button (click)="dialogRef.close({accepted: false})">Decline</button>
  `
})
export class ExampleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ExampleDialogComponent, DialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
```

### 3. Use the strictly typed service

```typescript
// Before (standard MatDialog):
constructor(private dialog: MatDialog) {}

openDialog() {
  const dialogRef = this.dialog.open(ExampleDialogComponent, {
    data: { title: 'Hello' } // No type checking!
  });
  
  dialogRef.afterClosed().subscribe(result => {
    // result is typed as 'any'
  });
}

// After (StrictlyTypedMatDialog):
constructor(private dialog: StrictlyTypedMatDialogService) {}

openDialog() {
  const dialogRef = this.dialog.open<ExampleDialogComponent, DialogData, DialogResult>(
    ExampleDialogComponent,
    {
      data: { 
        title: 'Hello',    // Type checked!
        message: 'World'   // Type checked!
      }
    }
  );
  
  dialogRef.afterClosed().subscribe(result => {
    // result is properly typed as DialogResult
    if (result?.accepted) {
      // TypeScript knows this is boolean
    }
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

#### open<C, D, R>(component: ComponentType<C>, config?: MatDialogConfig<D>): MatDialogRef<C, R>

- `C`: The component type
- `D`: The type of the dialog data
- `R`: The type of the result when the dialog is closed

## License

MIT
