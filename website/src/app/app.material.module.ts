import { NgModule } from '@angular/core';
import { MdButtonModule, MdCardModule, MdDialogModule, MdFormFieldModule, MdIconModule, MdInputModule, MdOptionModule,
  MdProgressBarModule, MdSelectModule, MdSnackBarModule, MdToolbarModule, MdTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCardModule,
    MdDialogModule,
    MdFormFieldModule,
    MdIconModule,
    MdInputModule,
    MdOptionModule,
    MdProgressBarModule,
    MdSelectModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdTooltipModule
  ],
  exports: [
    MdButtonModule,
    MdCardModule,
    MdDialogModule,
    MdFormFieldModule,
    MdIconModule,
    MdInputModule,
    MdOptionModule,
    MdProgressBarModule,
    MdSelectModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdTooltipModule
  ]
})
export class AppMaterialModule { }
