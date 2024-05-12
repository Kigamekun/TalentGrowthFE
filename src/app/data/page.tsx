
'use client';

import Image from "next/image";
import Modal from "../components/modal";
import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
    name: string;
    thumb: File;
    about: string;
    cover: File;
    phone: string;
    email: string;
    birth: string;
};


export default function Page() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormValues>({ mode: "onChange" })

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            (fileInputRef.current as HTMLInputElement).click();
        }
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {

        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch("https://fan-liberating-tabletop.glitch.me/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                if (response.ok) {
                    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                    if (modal) {
                        modal.close();
                    }
                    getUsers();
                } else {
                    // Handle error
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }

    const [users, setUsers] = useState([]);


    const getUsers = async () => {
        try {
            const response = await fetch("https://fan-liberating-tabletop.glitch.me/users");
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setUsers(data);
            } else {
                // Handle error
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    useEffect(() => {
        getUsers();
    }, []);



    return (
        <>
            <div className="flex  w-full justify-center items-center">
                <div className="my-10 p-10" style={{ width: "80%", background: 'white', borderRadius: "10px" }}>
                    <h3 className="text-2xl font-semibold mb-3">Data Profile Information</h3>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Birth</th>
                                    <th>About</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user: any, key: number) => (
                                    <tr key={key}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <Image src={`https://fan-liberating-tabletop.glitch.me${user.thumbUrl}`} width={50} height={50} className="rounded" alt={""} />
                                                </div>
                                                <div>
                                                    <div className="font-bold">{user.name}</div>
                                                    <div className="text-sm opacity-50">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {user.email}

                                        </td>
                                        <td>
                                            {user.phone}

                                        </td>
                                        <td>
                                            {user.birth}

                                        </td>
                                        <td>{user.about}</td>

                                    </tr>
                                ))}
                            </tbody>
                            {/* foot */}
                            <tfoot>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Birth</th>
                                    <th>About</th>
                                </tr>
                            </tfoot>

                        </table>
                    </div>

                </div>
            </div>
        </>
    );
}
