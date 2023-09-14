import React, { useContext, useEffect, useState } from 'react';
import Message from './Message';
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    if (data && data.chatId) {  // Check if data.chatId is defined
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        if (doc.exists()) {  // Check if document exists
          const docData = doc.data();
          if (docData && Array.isArray(docData.messages)) { // Check if messages exist and is an array
            setMessages(docData.messages);
          }
        }
      });

      return () => {
        unSub();
      };
    }
  }, [data.chatId]);

  return (
    <div className='messages'>
      {messages && Array.isArray(messages) && messages.length > 0 ? ( // Check if messages exist and is an array
        messages.map(m => (
          <Message message={m} key={m.id} />
        ))
      ) : null}
    </div>
  );
};

export default Messages;
