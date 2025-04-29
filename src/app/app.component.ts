import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FileUploadComponent} from './components/file-upload/file-upload.component';
import {TranslationTableComponent} from './components/translation-table/translation-table.component';
import {unflatten} from 'flat';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FileUploadComponent, TranslationTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'i18n-mass-editor';

  translations: { [lang: string]: any } | null = null;

  onFilesLoaded(files: { [lang: string]: any }) {
    this.translations = files;
  }

  saveFiles() {
    for (const lang of Object.keys(this.translations!)) {
      const unflattened = unflatten(this.translations![lang]);
      const blob = new Blob([JSON.stringify(unflattened, null, 2)], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${lang}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }
}
