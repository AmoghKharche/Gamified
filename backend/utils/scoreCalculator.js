// Example correct answers
const correctAnswers = {
  1: "A",
  2: "B",
  4: "D",
  5: "A",
  6: "C"
};

export const calculateScore = (submittedAnswers) => {
  let correctCount = 0;
  let wrongCount = 0;

  // submittedAnswers is an object: { "1": "A", "2": "B", ... }
  Object.entries(submittedAnswers).forEach(([questionId, answer]) => {
    const qid = Number(questionId); // keys are strings
    if (correctAnswers[qid]) {
      if (correctAnswers[qid] === answer) {
        correctCount++;
      } else {
        wrongCount++;
      }
    }
  });

  const result = correctCount >= 4 ? "Pass" : "Fail"; // Example rule

  return { correctCount, wrongCount, result };
};
