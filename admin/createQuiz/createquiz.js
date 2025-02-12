import { addDoc, collection, db } from "../../firebase.js"


const quizTitle = document.getElementById("quizTitle")
const quizCategory = document.getElementById("quizCategory")

const quesArr = []


const CreateQuiz = async () =>{

    try{
    const saveObj  = {

        title: quizTitle.value,
        category: quizCategory.value,
        questions: quesArr,
        isActive: false
    }
    console.log(quesArr)
    const result = await addDoc(collection(db, "quizzes"), saveObj)
    console.log(result)
    alert("Quiz Created Successfully");
    // window.location.reload();
} 
    catch (error) {
        alert(error.message)
        console.log(error.message)
    }
}
 

const AddQuestions = () => {
    const questionText = document.getElementById("questionText")
    const option1 = document.getElementById("option1")
    const option2 = document.getElementById("option2")
    const option3 = document.getElementById("option3")
    const option4 = document.getElementById("option4")
    const correctAnswer = document.getElementById("correctAnswer")


const quesObj =
    {
        questionText: questionText.value,
        options: [option1.value, option2.value, option3.value, option4.value],
        correctAns: correctAnswer.value,
    }
    quesArr.push(quesObj)
    alert("Question Added Successfully");
    questionText.value = ""
    option1.value = ""
    option2.value = ""
    option3.value = ""
    option4.value = ""
    correctAnswer.value = ""

    console.log("quesObj", quesObj)
}

window.CreateQuiz = CreateQuiz

window.AddQuestions = AddQuestions

