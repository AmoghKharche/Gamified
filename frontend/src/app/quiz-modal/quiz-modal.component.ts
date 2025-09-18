import { Component, Input } from '@angular/core';
import { IQuiz } from '../app.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-modal',
  imports: [CommonModule],
  templateUrl: './quiz-modal.component.html',
  styleUrl: './quiz-modal.component.css'
})

export class QuizModalComponent {
  @Input() quiz!: IQuiz;

  selectedOptionIndex: number | null = null;

  constructor(public activeModal: NgbActiveModal) {}

  selectOption(index: number, optionText: string) {
    // If an option is already selected, do nothing
    if (this.selectedOptionIndex !== null) {
      return;
    }

    // Record the selected index for styling
    this.selectedOptionIndex = index;

    // Close the modal after a short delay, passing the selected option's TEXT back
    setTimeout(() => {
      this.activeModal.close(optionText);
    }, 1000); // 1-second delay
  }
}
