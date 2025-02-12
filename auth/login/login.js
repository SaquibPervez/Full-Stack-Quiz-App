import { auth, db, doc, getDoc, signInWithEmailAndPassword } from "../../firebase.js"

const Login = async () => {
    try{

        const email = document.getElementById("email")
        const password = document.getElementById("password")
        
        const userAuth = await signInWithEmailAndPassword(auth, email.value, password.value)
        const uid = userAuth.user.uid
        // alert("User Login Successfully")
        // window.location.replace("/user/dashboard/dashboard.html")
        console.log(uid)

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        const userData = {
            ...docSnap.data(),
            uid
        }

        console.log(userData)

        localStorage.setItem("user", JSON.stringify(userData))

        if(userData.type === "admin"){
            window.location.replace("/admin/dashboard/dashboard.html")
        }
        else if(userData.type === "users"){
            window.location.replace("/user/dashboard/dashboard.html")
        }
    }
    catch(error){
        console.log(error.message);
    }
}
    
window.Login = Login