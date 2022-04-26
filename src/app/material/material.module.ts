import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';


const MyMaterialModules = [
  MatInputModule,
  MatCheckboxModule,
  MatIconModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule
]

@NgModule({
  providers:[
    MatNativeDateModule
  ],
  imports: [
    MyMaterialModules
  ],
  exports: [
    MyMaterialModules
  ]
})
export class MaterialModule { }
