import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

// We're assuming the IQuiz interface now includes an `id` property,
// which is essential for creating the desired output format.
export interface IQuiz {
  id: number;
  question: string;
  options: string[];
}

@Component({
  selector: 'app-quiz-modal',
  standalone: true, // It's good practice to make components standalone
  imports: [CommonModule],
  templateUrl: './quiz-modal.component.html',
  styleUrl: './quiz-modal.component.css'
})
export class QuizModalComponent {
  @Input() quiz!: IQuiz;

  selectedOptionIndex: number | null = null;

  constructor(public activeModal: NgbActiveModal) {}

  /**
   * Handles the selection of an answer option.
   * @param index The index of the selected option.
   */
  selectOption(index: number) {
    // If an option is already selected, do nothing to prevent changes.
    if (this.selectedOptionIndex !== null) {
      return;
    }

    // 1. Record the selected index for styling purposes.
    this.selectedOptionIndex = index;

    // 2. Convert the numeric index (0, 1, 2, ...) to a letter ('A', 'B', 'C', ...).
    const selectedLetter = String.fromCharCode(65 + index);

    // 3. Create the result object in the format { questionId: 'AnswerLetter' }.
    //    For example: { 1: 'A' }
    const result = { [this.quiz.id]: selectedLetter };

    // 4. Close the modal after a short delay, passing the new result object back.
    setTimeout(() => {
      this.activeModal.close(result);
    }, 500); // 500ms delay for user feedback
  }

  /**
   * Closes the modal without returning a value, typically for a close button.
   */
  close(): void {
    // Pass null or a specific value to indicate no answer was selected.
    this.activeModal.close(null);
  }
}
