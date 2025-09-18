import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
  question: { type: Number, required: true },
  answer: { type: String, required: true }
});

const quizSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    answers: [answerSchema], // store question+answer pairs
    correctCount: { type: Number, default: 0 },
    wrongCount: { type: Number, default: 0 },
    result: { type: String, enum: ["Pass", "Fail"], default: "Fail" }
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
