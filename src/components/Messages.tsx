"use client";

import { RealtimePayload } from "@/interfaces/realtime.interface";
import supabase from "@/utils/supabase";
import { useState, useEffect } from "react";

const Messages = () => {
    const [messages, setMessages] = useState([{}]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMessages = async () => {
            const { data } = await supabase
                .from("messages")
                .select("*")
                .order("created_at", { ascending: false });
            setMessages(data as any);
            setLoading(false);
        };
        getMessages();
    }, []);

    const handleInserts = (payload: RealtimePayload) => {
        setMessages((messages) => [payload.new, ...messages]);
    };

    supabase
        .channel("messages")
        .on(
            // @ts-ignore
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "messages" },
            handleInserts
        )
        .subscribe();

    return (
        <div className="bg-slate-50 p-4 rounded-lg w-2/3 mx-auto text-slate-700">
            <h1 className="border-b-2 py-2">Messages desde Postgres</h1>
            <div className="mt-4 italic">
                <ul className="space-y-2">
                    {!loading ? (
                        messages.map((message: any, index) => {
                            return (
                                <li
                                    key={index}
                                    className="flex justify-between items-center"
                                >
                                    <span>
                                        {message?.user || "usuario dice"}:{" "}
                                        {message?.message}
                                    </span>
                                    <span className="text-xs p-1 bg-slate-300 rounded-md shadow text-slate-500 ml-2">
                                        {new Date(
                                            message?.created_at
                                        ).toLocaleString()}
                                    </span>
                                </li>
                            );
                        })
                    ) : (
                        <li>No messages yet</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Messages;
