import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoModalComponent } from './info-modal/info-modal.component';
import { QuizModalComponent } from './quiz-modal/quiz-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

export interface IQuiz {
  question: string;
  options: string[];
  id: number; 
}

@Component({
  selector: 'app-root',
  imports: [CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  userAnswers: { [key: number]: string } = {};
  selectedQuiz: IQuiz | null = null;
  name:any
  email:any


  quizzes: IQuiz[] = [
    {
      id: 1, // Added ID
      question: "Which of the following is a mandatory requirement for all Unilever inventory counts?",
      options: [
        "Counts must be conducted monthly by a 3PCA",
        "Counts must be double-blind & conducted Quarterly",
        "Counts must be blind and conducted in Q4",
        "Counts must be made only for finished goods"
      ]
      // correctAnswerIndex is removed
    },
    {
      id: 2, // Added ID
      question: "What action must be taken if a second sample check fails in an automated warehouse?",
      options: [
        "Proceed with the count using estimates",
        "Suspend the count and consult GCAD",
        "Ignore discrepancies if under threshold",
        "Recount only the failed pallets"
      ]
    },
    {
      id: 3, // Added ID
      question: "",
      options:[

      ]
    },
    {
      id: 4, // Added ID
      question: "Why must SAP and Warehouse Management System be frozen during the inventory count?",
      options: [
        "To prevent unauthorized access",
        "To ensure no stock movements distort the count",
        "To allow system updates",
        "To reduce system load"
      ]
    },
    {
      id: 5, // Added ID
      question: "Which of the following is NOT a valid documentation requirement?",
      options: [
        "Screenshot of SAP report",
        "Justification for the count differences",
        "Verbal approval of adjustments",
        "Evidence of communication of count instructions"
      ]
    },
    {
      id: 6, // Added ID
      question: "What is minimum threshold for mandatory Unilever employee attendance at third-party counts (non-supply chain entities)?",
      options: [
        "€100,000",
        "€250,000",
        "€500,000",
        "€1,000,000"
      ]
    },
    // ... add the rest of your questions with unique IDs
  ];


  allModalData:any = [
    {
      bulletPoints: [
        'Its primary objective is to ensure inventory records are complete & accurate, which results in an accurate balance.',
        'Risk: Every missed box or miscounted pallet isn\'t just a number it could mean overstated profits or failed audits.'
      ]
    },
    {
      bulletPoints: [
        'Quarterly count is mandatory under GFCF (MTD C4.4 & C4.5).',
        'Blind counting is mandatory; double-blind is recommended.',
        'SAP and WMS must be frozen during the count.',
        'All stock locations (Own & Third Party) must be covered no exceptions.',
        'Minimum threshold for mandatory Unilever employee attendance at third-party counts is EUR 500,000'
      ]
    },
    {
      bulletPoints: [
        '3.1a: Manual warehouses + full blind count.',
        '3.1b: Automated warehouses → sample-based checks (basis sampling methodology signed off).',
        'If sample fails twice → stock is "unproven" ⁠and count is suspended.'
      ]
    },
    {
      bulletPoints: [
        'SAP reports (MB52) must be extracted before and after.',
        'All differences must be investigated and approved within 10 working days (or WD+7 for December month counts).',
        'Evidence must be stored and signed off per local SOA.'
      ] 
    },
    {
      bulletPoints: [
        'Hyperlink to Q&A form (e.g., Microsoft Forms).',
        'Top scorers + feedback form submitters win HUL Hampers.',
      ]
    },
   
    {
      bulletPoints: [
        'Hyperlink to feedback form.',
        'Reminder: Only complete submissions qualify for the prize.'
      ]
    }
  ];

  constructor(private modalService: NgbModal,private quizService: ApiService){}

  openModal1() {
    const modalRef = this.modalService.open(InfoModalComponent, { centered: true,   windowClass: 'my-big-modal'
    });
    modalRef.componentInstance.bulletPoints= this.allModalData[0].bulletPoints;
  }
  openModal2() {
    const modalRef = this.modalService.open(InfoModalComponent, { centered: true,   windowClass: 'my-big-modal'
    });
    modalRef.componentInstance.bulletPoints = this.allModalData[1].bulletPoints;
  }
  openModal3() {
    const modalRef = this.modalService.open(InfoModalComponent, { centered: true,   windowClass: 'my-big-modal'
    });
    modalRef.componentInstance.bulletPoints = this.allModalData[2].bulletPoints;
  }
  openModal4() {
    const modalRef = this.modalService.open(InfoModalComponent, { centered: true,   windowClass: 'my-big-modal'
    });
    modalRef.componentInstance.bulletPoints = this.allModalData[3].bulletPoints;
  }
  openModal5() {
    const modalRef = this.modalService.open(InfoModalComponent, { centered: true,   windowClass: 'my-big-modal'
    });
    modalRef.componentInstance.bulletPoints = this.allModalData[4].bulletPoints;
  }
  openModal6() {
    const modalRef = this.modalService.open(InfoModalComponent, { centered: true,   windowClass: 'my-big-modal'
    });
    modalRef.componentInstance.bulletPoints = this.allModalData[5].bulletPoints;
  }

  openQuizModal(quizData: IQuiz) {
    const modalRef = this.modalService.open(QuizModalComponent, {
      centered: false, 
      backdrop: 'static',
      keyboard: false,
      fullscreen:true
        });

    modalRef.componentInstance.quiz = quizData;

    if (this.userAnswers && this.userAnswers[quizData.id]) {
      modalRef.componentInstance.preSelectedAnswer = this.userAnswers[quizData.id];
    }

    modalRef.result.then((result: { [key: number]: string } | null) => {
      if (result) {
        this.userAnswers = { ...this.userAnswers, ...result };
        console.log('Current answers:', this.userAnswers);
      }
    }).catch(reason => {
    });
  }
  get isSubmitDisabled(): boolean {
    return Object.keys(this.userAnswers).length < 5;
  }
  isValidName(name: string): boolean {
    return /^[a-zA-Z\s]{2,50}$/.test(name.trim()); // only letters + spaces, min 2 chars
  }
  
  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()); // simple email regex
  }
  
  
  submitQuiz(){
    if (!this.name || !this.isValidName(this.name)) {
      alert("Please enter a valid name (only letters, min 2 characters).");
      return;
    }
  
    if (!this.email || !this.isValidEmail(this.email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    if(this.isSubmitDisabled){
      alert("Please answer all questions.");
      return;
    }

    const submission = {
      name: this.name,
      email: this.email,
      answers: this.userAnswers
    };


    this.quizService.submitQuiz(submission).subscribe({
      next: () => {
        alert("Quiz submitted successfully!");
      },
      error: (err) => {
        console.error("Submission failed:", err);
        alert("Error submitting quiz. Try again: " + (err.error?.message || 'Unknown error'));
      }
    });
  
  }
}
