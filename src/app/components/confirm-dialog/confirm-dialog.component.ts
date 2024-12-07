import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  @Output() isDeleteConfirmed: EventEmitter<boolean> = new EventEmitter(false);

  closeModal() {
    this.isDeleteConfirmed.emit(false);
  }

  confirmDelete() {
    this.isDeleteConfirmed.emit(true);
  }
}
