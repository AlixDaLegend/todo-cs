import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';



const angularModules = [
  CommonModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  FlexLayoutModule,
  MatMenuModule
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

