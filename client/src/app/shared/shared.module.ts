import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import { TestErrorComponent } from './components/test-error/test-error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [TestErrorComponent, NotFoundComponent, ServerErrorComponent],
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
  ],
  exports: [
    BsDropdownModule,
    TabsModule,
    ToastrModule,
    NgxSpinnerModule,
    FileUploadModule,
  ],
})
export class SharedModule {}
