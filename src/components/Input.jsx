import React, { useContext, useState } from 'react'
import Img from "../img/img.png"
import Attach from "../img/attach.png"
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  let isUploading = false; // Add this line outside the Input component

const handleSend = async () => {
  if (isUploading) {
    console.log("Upload in progress...");
    return;
  }
  
  console.log("db: ", db);
  console.log("data.chatId: ", data.chatId);

  if (img) {
    isUploading = true;

    const storageRef = ref(storage, uuid());
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on('state_changed',
      (snapshot) => {},
      (error) => {
        console.error(error);
        isUploading = false;
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            })
          });
          isUploading = false;
        } catch (error) {
          console.error(error);
          isUploading = false;
        }
      }
    );
  } else {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      })
    });
  }

  await updateDoc(doc(db, "userChats", currentUser.uid),{
    [data.chatId + ".lastMessage"]:{
      text
    },
    [data.chatId+".date"]: serverTimestamp(),
  });

  await updateDoc(doc(db, "userChats", data.user.uid),{
    [data.chatId + ".lastMessage"]:{
      text
    },
    [data.chatId+".date"]: serverTimestamp(),
  });

  setText("");
  setImg(null);

  

};

    return (
      <div className='input'>
        <input type="" 
        placeholder='Type Something....' 
        onChange={e=>setText(e.target.value)}
        value={text}/>
        <div className="send">
          <img src={Attach} alt="" />
          <input type="file" style={{display: "none"}} id='file' onChange={e=> setImg(e.target.files[0])} />
          <label htmlFor="file">
            <img src={Img} alt="" />
          </label>
          <button onClick={handleSend} >send</button>
        </div>
      </div>
    ) 
  
}
export default Input