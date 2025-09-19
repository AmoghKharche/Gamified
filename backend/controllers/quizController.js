import Quiz from "../models/quizModel.js";
import { calculateScore } from "../utils/scoreCalculator.js";

// API 1: Validate Email
export const validateEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await Quiz.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }
    return res.json({ message: "Email is valid" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// API 2: Submit Quiz
export const submitQuiz = async (req, res) => {
    try {
      const { email, answers } = req.body;
  
      const existing = await Quiz.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: "Email already submitted" });
      }
  
      const { correctCount, wrongCount, result } = calculateScore(answers);
  
      const answerArray = Object.entries(answers).map(([question, answer]) => ({
        question: Number(question),
        answer
      }));

      const quiz = new Quiz({
        email,
        answers: answerArray,
        correctCount,
        wrongCount,
        result
      });
      
      await quiz.save();
  
      res.status(201).json({
        feedbackLink: "https://forms.office.com/e/Pj6Az2xLDK"
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
