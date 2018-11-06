import {Component, ElementRef, ViewChild} from '@angular/core';

/**
 * @title Basic Inputs
 */
@Component({
  selector: 'input-overview-example',
  styleUrls: ['input-overview-example.css'],
  templateUrl: 'input-overview-example.html',
})
export class InputOverviewExample {
  @ViewChild('formulaArea')
  formulaArea: ElementRef<HTMLTextAreaElement>;

  keyMap(key: KeyboardEvent) {
    if (!isNaN(Number(key.key))) {
      this.formulaArea.nativeElement.value = this.formulaArea.nativeElement.value + key;
    }
    if (key.keyCode === 8) {
      
    }
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */