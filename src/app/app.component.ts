import { Component } from '@angular/core';
import { languageList} from './languageList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'auto-complete';
  suggestionData: string[] = [];

  constructor() {
    for (let languageCode in languageList) {
      if (languageList[languageCode]) {
        this.suggestionData.push(languageList[languageCode].name);
      }
    }
  }
}
