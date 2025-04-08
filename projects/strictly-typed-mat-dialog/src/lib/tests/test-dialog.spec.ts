import { TestBed } from '@angular/core/testing';
import { StrictlyTypedMatDialogService } from '../strictly-typed-mat-dialog.service';
import { TestDialogComponent } from './test-dialog.component';

describe('StrictlyTypedMatDialogService', () => {
    let service: StrictlyTypedMatDialogService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TestDialogComponent  // Instead of declarations, import the standalone component.
            ],
            providers: [StrictlyTypedMatDialogService]
        }).compileComponents();

        service = TestBed.inject(StrictlyTypedMatDialogService);
    });

    it('should open the dialog and return the correct result type', (done) => {
        const config = { data: { message: 'Hello Test' } };
        const dialogRef = service.open(TestDialogComponent, config);

        dialogRef.close('TestResult');

        dialogRef.afterClosed().subscribe((result) => {
            expect(result).toBe('TestResult');
            done();
        });
    });
});
