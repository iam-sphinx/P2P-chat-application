import React from "react";

function Message({ message, position, time, name, user }) {
  return (
    <div
      className={`flex ${
        name === user ? "items-end " : "items-start "
      } flex-col mx-5 my-2`}
    >
      <div
        className={`max-w-[250px] px-3 py-3 mt-3 rounded-lg ${
          name === user ? "rounded-br-none " : "rounded-bl-none "
        } bg-[#C9EEFF]`}
      >
        <h2 className="text-sm">{name}</h2>
        <h1 className="break-words text-xl">{message}</h1>
      </div>
      <h1 className="text-slate-400 text-sm mt-1 mr-2">{time}</h1>
    </div>
  );
}

export default Message;
