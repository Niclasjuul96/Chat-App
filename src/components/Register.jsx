import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db} from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [err, setErr] = useState(false)
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Wait for the upload to complete
            await new Promise((resolve, reject) => {
                uploadTask.on('state_changed', 
                () => {},  // Ignoring progress updates
                (error) => reject(error),  // On error
                () => resolve()  // On success
                );
            });
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref); 
                
            await updateProfile(res.user, {
                displayName, 
                photoURL: downloadURL,
            });
            
            console.log('About to call setDoc with user:', res.user);
            await setDoc(doc(db, "users", res.user.uid),{
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid),{})
            navigate("/")

        
        } catch(err) {
            console.error('Firebase Error: ' + err)
            setErr(true)
        }
        
    };


    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="header">Juul's Chat</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="display name"/>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/>
                    <input type="file" id="file"/>
                    <label htmlFor="file">
                        <img src={Add} alt=""/>
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign up</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>Do you have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
} 

export default Register;