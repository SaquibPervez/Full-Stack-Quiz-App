import {auth, getDoc, db,doc,collection,getDocs,updateDoc} from "../../firebase.js"

const Profiledata = document.getElementById("Profiledata")


const getdata =async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"))
        const uid = user.uid
        // const user = localStorage.getItem("user")
        // console.log(user)

    const data  = await getDoc(doc(db,"users",uid))
    console.log(data.data());


    Profiledata.innerHTML = `
    <div id="container">
        <div class="profile-container">
            <img id="profileImage" class="profile-img1" src="${data.data().imageURL}" alt="Profile">
        </div>
        <div class="profile-info">
            <h2 class="container">First Name:</h2>
            <h2>${data.data().firstname}</h2>
            <button class="btn" onclick="editFname()">
                <i class="fas fa-edit"></i> Edit
            </button>

            <h2 class="container">Last Name:</h2>
            <h2>${data.data().lastname}</h2>
            <button class="btn" onclick="editLname()">
                <i class="fas fa-edit"></i> Edit
            </button>

            <h2 class="container">Email:</h2>
            <h2>${data.data().email}</h2>
            <button class="btn" onclick="editemail()">
                <i class="fas fa-edit"></i> Edit
            </button>
        </div>
    </div>
`;
    } catch (error) {
        console.log(error.message)
    }
}

const editFname = async () => {

    const user = JSON.parse(localStorage.getItem("user"))
    const uid = user.uid
    const newFName = prompt("Enter new First Name:");
    if (!newFName) return; 

    try {
        await updateDoc(doc(db, "users", uid), 
        { firstname: newFName 

        });
        alert("First name updated successfully!");
        getdata()
    } catch (error) {
        console.error("Failed to update First Name:", error.message);
    }
};

const editLname = async () => {

    const user = JSON.parse(localStorage.getItem("user"))
    const uid = user.uid
    const newLName = prompt("Enter new Last Name:");
    if (!newLName) return; 

    try {
        await updateDoc(doc(db, "users", uid), 
        { lastname: newLName 

        });
        alert("Last Name updated successfully!");
        getdata()
    } catch (error) {
        console.error("Failed to update Last Name:", error.message);
    }
};

const editemail = async () => {

    const user = JSON.parse(localStorage.getItem("user"))
    const uid = user.uid
    const newemail = prompt("Enter new Email:");
    if (!newemail) return; 

    try {
        await updateDoc(doc(db, "users", uid), 
        { email: newemail 

        });
        alert("Email updated successfully!");
        getdata()
    } catch (error) {
        console.error("Failed to update Email:", error.message);
    }
};
const getImage = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.uid) {
        console.error("User not found in localStorage or missing UID");
        return;
    }

    const uid = user.uid;
    console.log("User UID:", uid);

    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        
        if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("User Data:", userData);
            console.log("image:", userDoc.data().imageURL);

            if (userData.imageURL) {
                const profileImage = document.getElementById("profileImage");
                
                if (profileImage) {
                    profileImage.src = userDoc.data().imageURL;
                }
            } 
        } 
    } catch (error) {
        console.error(error.message);
    }
};
function logout() {
    localStorage.clear();  
    window.location.href = "../../../index.html";  
}
window.getdata = getdata
window.addEventListener("load", getImage)
window.editFname = editFname
window.editLname = editLname
window.editemail = editemail
window.logout = logout