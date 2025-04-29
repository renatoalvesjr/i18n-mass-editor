import {Component, EventEmitter, Output} from '@angular/core';
import {flatten} from "flat";

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  @Output() filesLoaded = new EventEmitter<{ [lang: string]: any }>();

  onFileChange(event: any) {
    const files = event.target.files;
    const loadedFiles: { [lang: string]: any } = {}

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        const json = JSON.parse(reader.result as string);
        const flatJson = flatten(json);
        loadedFiles[file.name.split('.')[0]] = flatJson;

        console.log(loadedFiles)
        this.filesLoaded.emit(loadedFiles);
      };
      reader.readAsText(file);
    }
  }
}
