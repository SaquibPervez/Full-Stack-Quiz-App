import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from "../../firebase.js"


const supabaseClient = supabase.createClient('https://jtwzmxfwrjrflyidieie.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3pteGZ3cmpyZmx5aWRpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0NzYyODEsImV4cCI6MjA1NTA1MjI4MX0.EnK1YFAd1qSoKYGWIxghcY6_9hWf3OVJ-ewR8o4hhDU')

const Signup = async () =>{

    try{
    const firstname   = document.getElementById("firstname")
    const lastname = document.getElementById("lastname")
    const email  = document.getElementById("email")
    const password  = document.getElementById("password")
    const confirmpassword = document.getElementById("confirmpassword")

    // if (!firstname.value || !lastname.value || !email.value || !password.value || !confirmpassword.value) {
    //     alert("Required fields are missing!")
    //     return
    // }

    const Response = await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log("authResponse", Response)

    const profilepicture = document.getElementById("profilepicture")

const file = profilepicture.files[0]

console.log(file)
const { data, error } = await supabaseClient
  .storage
  .from('quizapp')
  .upload(file.name + new Date().getMilliseconds(), file)
  console.log("data", data)
  console.log("error", error)

  const { data: url } = supabaseClient
            .storage
            .from('quizapp')
            .getPublicUrl(data.path)

        console.log("URL", url)

    const userobj = {
        firstname: firstname.value,
        email: email.value, 
        lastname: lastname.value,
        type: "users",
        isBLock : false,
        isDeleted: false,
        imageURL: url.publicUrl
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



