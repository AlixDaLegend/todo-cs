import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


const angularModules = [
  CommonModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatDialogModule,
  ReactiveFormsModule,
  MatInputModule
]

const thirdPartyModules = [
  FlexLayoutModule
]

@NgModule({

  imports: [
    ...angularModules,
    ...thirdPartyModules
  ],
  exports: [
    ...angularModules,
    ...thirdPartyModules
  ]
})
export class SharedModule { }

