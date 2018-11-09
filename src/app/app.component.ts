import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';
// import {} from '@ngrx/store';
import { AceEditorComponent } from 'ng2-ace-editor';
import 'brace';
import 'brace/ext/language_tools';
import 'brace/mode/python';
import './utils/dejoule-mode';
// import ''

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @Input()
  width: string;
  @Input()
  height: string;
  name = 'Angular';
  text = '';
  options = {
    animatedScroll: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    showPrintMargin: false,
    tabSize: 2,
    useSoftTabs: false
  };
  @ViewChild('editor')
  editor: AceEditorComponent;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.editor.setMode({
      path: 'ace/mode/dejoule',
      v: Date.now()
    });
    console.log(this.editor.getEditor());
    // update keywords
    this.editor.getEditor().session.$mode.$highlightRules.setKeywords({
      constants: 'CWIT(Library AHU)|CWOT(Library AHU)'
    });
    // force rehighlight whole document
    this.editor.getEditor().session.bgTokenizer.start(0);
  }

  print(evt) {
    console.log(this.text, evt);
  }
}
