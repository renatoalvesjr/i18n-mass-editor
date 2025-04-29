import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-translation-table',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './translation-table.component.html',
  styleUrl: './translation-table.component.css'
})
export class TranslationTableComponent {
  @Input() translation!: { [lang: string]: any };

  get keys(): string[] {
    return Object.keys(this.translation);
  }

  get languages(): string[] {
    return Object.keys(this.translation[this.keys[0]]);
  }
}
