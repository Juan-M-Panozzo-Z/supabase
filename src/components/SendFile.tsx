"use client";
import supabase from "@/utils/supabase";
import { useState, useEffect } from "react";

const SendFile = () => {
    const [file, setFile] = useState() as any;
    const [user, setUser] = useState({} as any);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setUser(data?.session?.user || {});
        });
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const { data, error } = await supabase.storage
            .from("avatar")
            .upload(`${file?.name}`, file as any);
        if (error) {
            console.log(error);
            return;
        }
    };

    const handleSignIn = async (e: any) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
            email: "juanmaa.jxk@live.com.ar",
            password: "34584024",
        });

        if (error) {
            console.log(error);
            return;
        }
    };

    return (
        <div>
            <div className="flex gap-2 items-center justify-between">
                <h1>{user?.email || "inicia sesion"}</h1>
                <button
                    type="button"
                    onClick={handleSignIn}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Login
                </button>

                <button
                    type="button"
                    onClick={() => supabase.auth.signOut()}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Sign Up
                </button>
            </div>

            <div className="mt-4 border-t-2 py-4">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input
                        onChange={(e: any) => setFile(e.target.files[0])}
                        type="file"
                        multiple={false}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Send File
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SendFile;
