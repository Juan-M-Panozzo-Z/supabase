"use client";

import { useState } from "react";
import supabase from "@/utils/supabase";

const SendMessage = () => {
    const [message, setMessage] = useState("");
    const [user, setUser] = useState("");

    const sendMessage = async () => {
        const { error } = await supabase.from("messages").insert([{ message, user }]);
        if (error) console.log(error);
        setMessage("");
        setUser("");
    };

    return (
        <div>
            <input
                className="bg-slate-50 text-slate-500 italic p-4 rounded-l-lg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Ingresá tu mensaje aquí..."
            />
            <input
                className="bg-slate-100 text-slate-600 p-4"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                type="text"
                placeholder="Usuario"
            />
            <button
                type="button"
                onClick={sendMessage}
                className="bg-green-200 p-4 text-slate-900 rounded-r-lg"
            >
                Send
            </button>
        </div>
    );
};

export default SendMessage;
