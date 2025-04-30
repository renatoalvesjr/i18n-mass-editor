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

  newKey = '';

  set keys(key: string) {
    this.keys.push(key);
  }

  get keys(): string[] {
    return Object.keys(this.translation);
  }

  get languages(): string[] {
    return Object.keys(this.translation[this.keys[0]]);
  }

  set languages(language: string) {
    this.languages.push(language);
  }

  addKey() {
    if (this.newKey) {
      for (const key of this.keys) {
        this.translation[key] ??= {};
        this.translation[key][this.newKey] ??= '';
      }
      this.newKey = '';
      // Trigger UI update; reassigning the translation object to itself
      this.translation = { ...this.translation };
    }
  }
}
