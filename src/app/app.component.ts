import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @Input('selectedTab') selected: string;
  @Input() selected: string;

  onSelect(tab: string) {
    this.selected = tab;
  }
}
