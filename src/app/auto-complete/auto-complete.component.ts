import {Component, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import index from '@angular/cli/lib/cli';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {

  suggestions: Array<string> = [];
  @Input('data') data: string[] = ['english', 'turkish', 'french', 'spanish', 'russian'];
  @Input('placeHolder') placeHolder = 'Please enter something';
  @Input('minChars') minChars = 0;
  @ViewChild('text') text;
  @ViewChild('container') container;

  selecteItemIndex = -1;
  previousValue = '';
  isSuggestionHidden = true;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  onChangeText(item: string, event: Event): void {
    console.log(event.type);
    this.isSuggestionHidden = true;
    this.suggestions = [];
  }

  onInputChange(item: string, event: Event): void {
    if (item !== this.previousValue && event.key !== 'Enter' && item.length > this.minChars) {
      this.isSuggestionHidden = false;
      this.previousValue = item;
      this.suggestions = this.sugesstionFilter(item);
    }
  }

  doThat(e) {
    console.log('dothat work');
    console.log(e)
  }
  sugesstionFilter(searchTerm: string): Array<string> {
    if (!searchTerm) return [];
    return this.data.filter((el) => {
      if (el) {
        if (el.toLowerCase().includes(searchTerm.toLowerCase())) {
          return true;
        }
      }

      return false;
    });
  }

  public inputElKeyHandler = (evt: Event) => {
    const suggestionLength = this.suggestions.length;
    console.log(evt.keyCode);
    switch (evt.keyCode) {
      case 27: // ESC
        this.suggestions = [];
        this.isSuggestionHidden = true;
        break;

      case 38: // UP
        if (this.selecteItemIndex > 0) {
          this.selecteItemIndex--;
          this.scrollToView(this.selecteItemIndex);
        }
        break;

      case 40: // DOWN
        if (this.selecteItemIndex + 1 < suggestionLength ) {
          this.selecteItemIndex++;
          this.scrollToView(this.selecteItemIndex);
        }
        break;

      case 13: // ENTER
        if (this.selecteItemIndex > -1 && this.selecteItemIndex < suggestionLength) {
          this.text.nativeElement.value = this.suggestions[this.selecteItemIndex];
          console.log(this.text.nativeElement.value);
          this.suggestions = [];
          this.selecteItemIndex = -1;
          this.isSuggestionHidden = true;
        }

        break;

      case 8:
        this.suggestions = this.sugesstionFilter(evt.target.value);
        this.selecteItemIndex = -1;
        break;
      case 9:
        break;
    }
  }

  public scrollToView(index: number): void {
    const container = this.container.nativeElement;
    const ul = container.querySelector('ul');
    const li = ul.querySelector('li');
    const liHeight = li.offsetHeight;
    const scrollTop = ul.scrollTop;
    const viewport = scrollTop + ul.offsetHeight;
    const scrollOffset = liHeight * index;
    if (scrollOffset < scrollTop || (scrollOffset + liHeight) > viewport) {
      ul.scrollTop = scrollOffset;
    }
  }

}
