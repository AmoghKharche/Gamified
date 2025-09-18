// Example correct answers (question → answer)
const correctAnswers = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "A",
    6: "C"
  };
  
  export const calculateScore = (submittedAnswers) => {
    let correctCount = 0;
  
    submittedAnswers.forEach(({ question, answer }) => {
      if (correctAnswers[question] && correctAnswers[question] === answer) {
        correctCount++;
      }
    });
  
    const wrongCount = submittedAnswers.length - correctCount;
    const result = correctCount >= 4 ? "Pass" : "Fail"; // Example rule
  
    return { correctCount, wrongCount, result };
  };
  