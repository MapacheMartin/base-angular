import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordViewerComponent } from './record-viewer/record-viewer.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectSearchComponent } from './select-search/select-search.component';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RecordViewerComponent,
    SelectSearchComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    NgbTooltipModule,
    MatSelectModule,
    NgxMatSelectSearchModule
  ],
  exports:[
    RecordViewerComponent,
    SelectSearchComponent
  ],
  providers:[

  ]
})
export class HelpersModule { }
