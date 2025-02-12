import { collection, db, getDocs, query, where } from "../../firebase.js"

const scoreTable = document.getElementById("scoreTable")
const user = JSON.parse(localStorage.getItem("user"))
const quizID = sessionStorage.getItem("quizId")
console.log(user)
console.log(quizID, "quizid")
let counter = 1;

const q = query(collection(db, "scores"), where("userId", "==", user.uid))

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(doc => {
            console.log(doc.data())
            const data = doc.data()
            const per = (data.score / data.totalQues) * 100
            scoreTable.innerHTML += `  <tr>
            <td> ${counter} </td>
            <td>${data.firstname}</td>
            <td>${data.quizTitle}</td>
            <td>${data.score}</td>
            <td>${data.wrongAns}</td>
            <td>${data.totalQues}</td>
            <td>${per.toFixed(1)}%</td>
        </tr>`
        counter++
        })
        
// console.log("hello")


function logout() {
    localStorage.clear();  
    window.location.href = "../../../index.html";  
}

// window.getScoreListing = getScoreListing
window.logout = logout