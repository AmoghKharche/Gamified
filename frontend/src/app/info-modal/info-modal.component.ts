import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-modal',
  template: `
 <div class="custom-modal-header">
      <button type="button" class="close-button" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
       <i class="bi bi-x-circle-fill"></i>
      </button>
    </div>

<div class="custom-modal-body">
  
  <div *ngFor="let point of bulletPoints" class="bullet-point">
    <span class="bullet-icon"></span>
    <p>{{ point }}</p>
  </div>
  
</div>

  `,
  styleUrls: ['./info-modal.component.css'],
  imports:[CommonModule]
})
export class InfoModalComponent {
  @Input() bulletPoints: string[] = [];
  constructor(public activeModal: NgbActiveModal) {}
}
