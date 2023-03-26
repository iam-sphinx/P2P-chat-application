import { useState } from "react";
import { io } from "socket.io-client";
import Message from "./Message";

function Chat() {
  const socket = io("http://localhost:4000/");
  const [currentMessage, setCurrentMessage] = useState("");
  const [message, setMessage] = useState([]);
  const [User, setUser] = useState("");
  const [check, setCheck] = useState(false);

  socket.emit("new-user", User);

  //recieve message from backend
  socket.on("recieve", (data) => {
    const temp = {
      message: data.message,
      name: data.name,
      position: data.position,
      time: data.time,
    };
    setMessage([temp, ...message]);
  });

  const handleClick = () => {
    
    //emit message to backend
    currentMessage && socket.emit("send-message", currentMessage);
    setCurrentMessage("");
  };

  const handleKeyDown = (e) =>{

    if(e.key === 'Enter')
    {
      //emit message to backend
    currentMessage && socket.emit("send-message", currentMessage);
    setCurrentMessage("");
    }
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <div className=" flex flex-col p-2 justify-end h-[40rem] w-[36rem] bg-gray-500 rounded-md overflow-hidden">
        <div
          className={`h-full w-full flex flex-col-reverse justify-start rounded-md bg-hero-pattern overflow-y-auto`}
        >
          {message.map((message) => (
            <Message
              message={message.message}
              name={message.name}
              time={message.time}
              user={User}
            />
          ))}
        </div>
        {check ? (
          <div className="flex gap-2 pt-2">
            <input
              className="py-1 px-2 w-full bg-gray-700 text-white text-xl rounded-full outline-none"
              type="text"
              value={currentMessage}
              onChange={(e) => {
                setCurrentMessage(e.target.value);
              }}
              onKeyDown = {handleKeyDown} 
              placeholder="message..."
            />
            <button
              onClick={handleClick}
              className="py-1 px-5 bg-white text-black border-2 rounded-full border-gray-600"
            >
              Send
            </button>
          </div>
        ) : (
          <div className="flex gap-2 pt-2">
            <input
              className="py-1 px-2 w-full bg-gray-700 text-white text-xl rounded-full outline-none"
              type="text"
              value={User}
              onChange={(e) => {
                setUser(e.target.value);
              }}

              onKeyDown= {(e)=>{
                if(e.key === 'Enter')
                {
                  User && setCheck(!check)
                }
              }}
              placeholder="Hey please enter your name! to Continue..."
            />
            <button
              onClick={()=>{User && setCheck(!check) }}
              className="py-1 px-5 bg-white text-black border-2 rounded-full border-gray-600"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
