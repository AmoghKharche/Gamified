import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoModalComponent } from './info-modal/info-modal.component';
import { QuizModalComponent } from './quiz-modal/quiz-modal.component';

export interface IQuiz {
  question: string;
  options: string[];
  id: number; 
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  userAnswers: { [key: number]: string } = {};
  selectedQuiz: IQuiz | null = null;


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
      question: "What is the primary risk of an inaccurate inventory count?",
      options: [
        "Decreased employee morale",
        "Overstated profits and failed audits",
        "Increased marketing costs",
        "Slower production times"
      ]
    },
    {
      id: 3, // Added ID
      question: "What is the primary risk of an inaccurate inventory count?",
      options: [
        "Decreased employee morale",
        "Overstated profits and failed audits",
        "Increased marketing costs",
        "Slower production times"
      ]
    },
    {
      id: 4, // Added ID
      question: "What is the primary risk of an inaccurate inventory count?",
      options: [
        "Decreased employee morale",
        "Overstated profits and failed audits",
        "Increased marketing costs",
        "Slower production times"
      ]
    },
    {
      id: 5, // Added ID
      question: "What is the primary risk of an inaccurate inventory count?",
      options: [
        "Decreased employee morale",
        "Overstated profits and failed audits",
        "Increased marketing costs",
        "Slower production times"
      ]
    },
    {
      id: 6, // Added ID
      question: "What is the primary risk of an inaccurate inventory count?",
      options: [
        "Decreased employee morale",
        "Overstated profits and failed audits",
        "Increased marketing costs",
        "Slower production times"
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

  constructor(private modalService: NgbModal){}

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
      centered: false, // We will handle centering manually
      backdrop: 'static',
      keyboard: false,
      // This is the key change: apply our custom class
      windowClass: 'custom-fixed-modal' 
        });

    modalRef.componentInstance.quiz = quizData;

    // **CRITICAL CHANGE**: Capture the result when the modal closes
    modalRef.result.then((selectedOption: string) => {
      if (selectedOption) {
        // Store the answer from the modal
        this.userAnswers[quizData.id] = selectedOption;
        console.log('Current answers:', this.userAnswers); // You can see the collected data here
        // This is where you would eventually send the data to the backend
      }
    }).catch(reason => {
      console.log('Modal dismissed:', reason); // Handle cases where the user closes the modal without answering
    });
  }
}
