import { Question } from "./Question.js";
import { CreateQuiz, startQuiz } from "./main.js";

export class Quiz{
    static index = 0;
    constructor(Category, Difficulity , NumOfQuestions){
        this.Category=Category;
        this.Difficulity=Difficulity;
        this.NumOfQuestions = NumOfQuestions;
        this.questions=[];
        this.grade=0;
    }
    async getDataFromAPi(){
     let request =await fetch(`https://opentdb.com/api.php?amount=${this.NumOfQuestions}&category=${this.Category}&difficulty=${this.Difficulity}&type=multiple`);
     let data= await request.json();
     this.createQuestions(data.results);   
    }

    createQuestions(data){
        for (const question of data ) {
            this.questions.push(
                new Question(question.category,question.correct_answer,question.incorrect_answers,question.question)
            );
        }
    }

    startQuiz(){
        CreateQuiz.style.display="none";
        startQuiz.style.display="block";
        this.questions[Quiz.index].displayQuestion(Quiz.index ,this.Difficulity,this.NumOfQuestions);
        //gradeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee 
    }

     nextQuestion(){
        Quiz.index++;
        if(Quiz.index < this.questions.length){
        this.questions[Quiz.index].displayQuestion(Quiz.index ,this.Difficulity,this.NumOfQuestions);
        
         }
    }
  
}