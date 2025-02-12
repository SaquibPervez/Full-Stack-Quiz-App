import { collection, db, getDocs, query, where } from "../../firebase.js"

const scoreTable = document.getElementById("scoreTable")
let counter = 1;

const user = JSON.parse(localStorage.getItem("user"))

// const q = query(collection(db, "scores"), where("userId", "==", user.uid))

const querySnapshot = await getDocs(collection(db, "scores"))
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

const quizDropdown = document.getElementById("quizDropdown");
console.log("getQuizList");

const quizSnap = await getDocs(collection(db, "quizzes"));

quizDropdown.innerHTML = `<option value="all">All</option>`;

quizSnap.forEach((doc) => {
    const quizObj = { ...doc.data(), id: doc.id };
    console.log("quizObj", quizObj, doc.id);
    quizDropdown.innerHTML += `<option value="${doc.id}">${doc.data().title}</option>`;
});

const filterQuiz = async (ele) => {
    console.log("ele", ele.value);

    const user = JSON.parse(localStorage.getItem("user"));

    let q;

    if (ele.value === "all") {
        q = query(collection(db, "scores"));
    } else {
        q = query(collection(db, "scores"), where("quizId", "==", ele.value));
    }

    scoreTable.innerHTML = `
    <tr>
        <td>No#</td>
        <td>Name</td>
        <td>Quiz Name</td>
        <td>Score</td>
        <td>Wrong Ans</td>
        <td>Total Question</td>
        <td>Percentage%</td>
    </tr>`;

    let counter = 1; 
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        const data = doc.data();
        const per = (data.score / data.totalQues) * 100;

        scoreTable.innerHTML += `<tr>
            <td>${counter}</td>
            <td>${data.firstname}</td>
            <td>${data.quizTitle}</td>
            <td>${data.score}</td>
            <td>${data.wrongAns}</td>
            <td>${data.totalQues}</td>
            <td>${per.toFixed(1)}%</td>
        </tr>`;

        counter++;
    });
};
function logout() {
    localStorage.clear();  
    window.location.href = "../../index.html";  
}

window.filterQuiz = filterQuiz
window.logout = logout
    