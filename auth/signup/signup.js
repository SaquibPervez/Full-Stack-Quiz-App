import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from "../../firebase.js"


const Signup = async () =>{

    try{
    const firstname   = document.getElementById("firstname")
    const lastname = document.getElementById("lastname")
    const email  = document.getElementById("email")
    const password  = document.getElementById("password")
    const confirmpassword = document.getElementById("confirmpassword")

    if (!firstname.value || !lastname.value || !email.value || !password.value || !confirmpassword.value) {
        alert("Required fields are missing!")
        return
    }

    const Response = await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log("authResponse", Response)

    const userobj = {
        firstname: firstname.value,
        email: email.value, 
        lastname: lastname.value,
        type: "users",
        isBLock : false,
        isDeleted: false,
    }

    await setDoc(doc(db, "users", Response.user.uid), userobj)
    alert("User Successfully Signed Up!")
    window.location.assign("../../index.html")

    }

catch (error) {
    console.log("error", error.message)
    alert(error.message)
}
}
window.Signup = Signup



