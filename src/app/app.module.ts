import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AceEditorModule } from 'ng2-ace-editor';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, FormsModule, AceEditorModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
