import { getDoc, doc,db, addDoc, collection, query,where,getDocs, setDoc} from "../../../firebase.js"

let questions = []
let indexNumber = 0
let score = 0


const questionElement = document.getElementById("questionElement")
const optionElement = document.getElementById("optionElement")
var nextBtn = document.getElementById("nextBtn")

let currentQuesCount = document.getElementById("currentQuesCount")
var totalCount = document.getElementById("totalCount")


const quizContainer = document.getElementById("quizContainer")
const resultContainer = document.getElementById("resultContainer")


const checkQuizID = async () => {

    try {
        const quizID = sessionStorage.getItem("quizId")
    console.log(quizID)

    if(quizID == null){
        window.location.replace("../../dashboard/dashboard.html")
        return
    }
    const docsnap = await getDoc(doc(db, "quizzes", quizID))
    console.log(docsnap.data())

    questions = docsnap.data().questions
    totalCount.innerHTML = questions.length

    return questions 

    // console.log(questions)

    } catch (error) {
        return error.message
    }
    
}

checkQuizID()
    .then((response) => {
        console.log("response", response)
        questions = response
        handleQuestion()
    })
    .catch((error) => {
        console.log("error", error)
    })

    const handleQuestion = () => {
        var optionsObj = questions[indexNumber].options
        var questionTitle = questions[indexNumber].questionText
        console.log(optionsObj)
        console.log(questionTitle)
    
        questionElement.innerHTML = questionTitle
        optionElement.innerHTML = ""
        for (var i = 0; i < optionsObj.length; i++) {
            optionElement.innerHTML += `<li onclick="checkAns(this)" >${optionsObj[i]}</li>`
        }
        currentQuesCount.innerHTML = indexNumber + 1;
    }
    nextBtn.disabled = true

    const nextQues = () => {
        console.log("questions", questions);
    
      
        if (indexNumber < questions.length - 1) {
            indexNumber++; 
            nextBtn.disabled = true;
            handleQuestion();
            currentQuesCount.innerHTML = indexNumber + 1;
    
            if (indexNumber === questions.length - 1) {
                nextBtn.innerText = "Submit";
            }
        } 
        else if (indexNumber === questions.length - 1) {
            console.log("submit");
            onsubmit();
        }
    };
    

    const checkAns = (Element) =>{
        const allLiElement = optionElement.children
    console.log(Element.innerHTML)
    console.log()
    const correctAns = questions[indexNumber].correctAns

        if(Element.innerHTML === correctAns){
            console.log("correct")
            Element.style.backgroundColor = "green"
            score++
    }else{
        console.log("incorrect")
        Element.style.backgroundColor = "red"
      
    
    

    for (var i = 0; i < allLiElement.length; i++) {
        if (allLiElement[i].innerHTML == correctAns) {
            allLiElement[i].style.backgroundColor = "green"
            break
        }
        
    }
    
    }
    nextBtn.disabled = false;
}

const onsubmit = async () => {
    const quizID = sessionStorage.getItem("quizId")
    console.log("quizID",quizID)
    // return
    const docsnap = await getDoc(doc(db, "quizzes", quizID))
    console.log("quiz data", docsnap.data())
    const quizTitle = docsnap.data().title
    // console.log("total Ques", questions.length)
    console.log("score", score)
    console.log("wrong ans", questions.length - score)
    const user = JSON.parse(localStorage.getItem("user"))
    console.log("user", user)

    const scoreObj = {
        totalQues: questions.length,
        score: score,
        wrongAns: questions.length - score,
        quizId: sessionStorage.getItem("quizId"),
        userId: user.uid,
        firstname: user.firstname,  
        quizTitle: quizTitle
    }
    

    const response = await addDoc(collection(db, "scores"), scoreObj)
       console.log("response score", response)

    console.log("scoreObj", scoreObj)

    quizContainer.style.display = "none"
    var resultContainer = document.getElementById("resultContainer")
    resultContainer.style.display = "block"

    var scores = document.getElementById("scores").children
    scores[0].innerHTML = `Quiz Name: ${quizTitle}`
    scores[1].innerHTML = `Score: ${score}`
    scores[2].innerHTML = `Wrong ans: ${ questions.length - score}`
    scores[3].innerHTML = `Total Ques: ${questions.length}`
    scores[4].innerHTML = `Percentage ${(score/questions.length)*100}%`


    // document.getElementById("resultContainer").style.display = "block"

}

    function logout() {
        localStorage.clear();  
        window.location.href = "../../../index.html";  
    }

    document.getElementById("btn").addEventListener("click", function() {
        window.location.href = "/user/dashboard/dashboard.html";
    });

window.logout = logout
window.nextQues = nextQues
window.checkAns = checkAns
window.onsubmit = onsubmit
// window.checkQuizId = checkQuizId
