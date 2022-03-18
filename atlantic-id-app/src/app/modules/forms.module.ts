import { NgModule } from "@angular/core";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


@NgModule({
    exports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule
    ],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    ]
})
export class ExportFormsModule {}