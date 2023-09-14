import React, { useContext, useState } from 'react'
import { collection, query, where, getDoc, doc, serverTimestamp, setDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Search = () => {
  const [username,setUsername] = useState("")
  const [user,setUser] = useState(null)
  const [err,setErr] = useState(false)

  const { currentUser } = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
    });
    } catch (error) {
      setErr(true)
    }
  }

  const handleKey = e=>{
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () => {
    //check whhether the group(chats in firestore) exists, if not create
    const combinedId = currentUser.uid > user.uid 
      ? currentUser.uid + user.uid 
      : user.uid + currentUser.uid;

    try {
      console.log("before getDoc");
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log("after getDoc");

      console.log("Result from getDoc: ", res);
      console.log("Exists property: ", res.exists); 
      console.log("Result from res.exists(): ", res.exists());

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
    
        //Create user chats
        await setDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId]:{
            ["userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL
            },
            ["date"]: serverTimestamp()
          }
        }, { merge: true });
        
        await setDoc(doc(db, "userChats", user.uid), {
          [combinedId]:{
            ["userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
            },
            ["date"]: serverTimestamp()
          }
        }, { merge: true });
      }
    } catch (error) {
      console.error("error here", error);
      setErr(true);
    }
      setUser(null);
      setUsername("");
  }

  return (
    <div className='search'>
      <div className="searchForm">
        <input type='text' 
        placeholder='Find a user' 
        onKeyDown={handleKey} 
        onChange={e=>setUsername(e.target.value)}
        value={username}/>
      </div>
      {err && <span>User not found</span>}
      {user &&<div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="userPhoto" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search