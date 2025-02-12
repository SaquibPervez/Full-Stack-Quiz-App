import { collection, db, doc, getDocs, updateDoc } from "../../firebase.js"


const parent = document.querySelector(".container")


const Quizlist = async () => {

    const quizsnap = await getDocs(collection(db, "quizzes"))
    console.log(quizsnap)
    parent.innerHTML = ""

    quizsnap.docs.forEach((doc) => {
        const  quizobj = {...doc.data(), id: doc.id}
        console.log("quizObj", quizobj, doc.id)

        parent.innerHTML += `<div class="quiz-card">
        <h3 class="quiz-title"> ${quizobj.title} </h3>
        <p class="quiz-description"> ${quizobj.category} </p>
            ${quizobj.isActive == true ?
            `<button id=${doc.id} class="quiz-status-btn active" onclick="toggleStatus(this , 'active')">Active</button>` : `<button id=${doc.id} class="quiz-status-btn inactive" onclick="toggleStatus(this , 'inactive')">Inactive</button>`

        }
        
    </div>`

    })

}

window.addEventListener("load", Quizlist)


const toggleStatus = async (Element, status) => {
    console.log(Element.id, status)

    const cardId = Element.id

    try {
        await updateDoc(doc(db, "quizzes", cardId), {
            isActive: status === "active" ? false : true
        });

        await Quizlist(); 
    } catch (error) {
        console.error("Error updating quiz status:", error);
    }
}

window.Quizlist = Quizlist
window.toggleStatus = toggleStatus