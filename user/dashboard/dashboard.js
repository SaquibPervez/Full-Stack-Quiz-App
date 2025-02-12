import { collection, doc ,db,  getDocs } from "../../firebase.js"

const container = document.getElementById("container")

const quizlisting = async () => {

    try {
        const docsnap = await getDocs(collection(db, "quizzes"))
        console.log(docsnap)
        
        docsnap.forEach((doc) =>{
            const data = doc.data()
            console.log(doc.data())

            if(data.isActive === true){
                container.innerHTML += ` <div class="quiz-card">
                <h3 class="quiz-title">${data.title}</h3>
                <p class="quiz-description">${data.category}</p>
                <button id = ${doc.id} class="quiz-status-btn active" onclick="navigate(this)">Start Quiz</button>
            </div>`
            }

            
        })

    } catch (error) {   
        console.log(error.message)
    }
}

const navigate = (Element) => {
    console.log(Element.id)

    sessionStorage.setItem("quizId", Element.id)
    window.location.assign("./quizapp/quizapp.html")
}
function logout() {
    localStorage.clear();  
    window.location.href = "../../../index.html";  
}

window.addEventListener("load", quizlisting)

window.quizlisting = quizlisting
window.navigate = navigate
window.logout = logout