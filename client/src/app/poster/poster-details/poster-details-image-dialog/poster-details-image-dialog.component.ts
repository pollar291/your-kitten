import {Component, Inject} from '@angular/core';
import {DIALOG_DATA} from '@angular/cdk/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-poster-details-image-dialog',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './poster-details-image-dialog.component.html',
  styleUrl: './poster-details-image-dialog.component.css'
})
export class PosterDetailsImageDialogComponent {
  constructor(@Inject(DIALOG_DATA) public data: {imageUrl: string}) { }
}
