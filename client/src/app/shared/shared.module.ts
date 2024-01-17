import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import { TimeagoModule } from 'ngx-timeago';
import {
  TestErrorComponent,
  ServerErrorComponent,
  NotFoundComponent,
  TextInputComponent,
} from './components';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

const COMPONENTS = [
  TestErrorComponent,
  NotFoundComponent,
  ServerErrorComponent,
  TextInputComponent,
  DatePickerComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    NgxSpinnerModule.forRoot({
      type: 'line-scale-party',
    }),
    FileUploadModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TimeagoModule.forRoot(),
  ],
  exports: [
    ...COMPONENTS,
    BsDropdownModule,
    TabsModule,
    ToastrModule,
    NgxSpinnerModule,
    FileUploadModule,
    BsDatepickerModule,
    PaginationModule,
    ButtonsModule,
    TimeagoModule,
  ],
})
export class SharedModule {}
