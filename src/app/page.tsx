
'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

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


    const router = useRouter();
    const [thumbPreview, setThumbPreview] = useState(""); // State for save preview for thumbnail
    const [coverPreview, setCoverPreview] = useState(""); // State for save preview for cover
    const [selectedThumb, setSelectedThumb] = useState<File>();
    const [selectedCover, setSelectedCover] = useState<File>();


    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            (fileInputRef.current as HTMLInputElement).click();
        }
    };

    const handleThumbChange = (e: any) => {
        const file = e.target.files[0]; // get thumbnail file from input
        setSelectedThumb(e.target.files?.[0]);

        // Memeriksa apakah file adalah gambar
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader(); // make FileReader object
            reader.onloadend = () => {
                setThumbPreview(reader.result as string); // save object URL to state
            };
            reader.readAsDataURL(file); // read thumbnail file as data URL
        } else {
            // Show error message if file is not an image
            alert('Please select an image file for thumbnail.');
            // Clear file input
            e.target.value = null;
        }
    };

    // Function to handle cover change
    const handleCoverChange = (e: any) => {
        const file = e.target.files[0]; // Get cover file from input
        setSelectedCover(e.target.files?.[0]);

        // Check if file is an image
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader(); // Make FileReader object
            reader.onloadend = () => {
                setCoverPreview(reader.result as string); // Save object URL to state
            };
            reader.readAsDataURL(file); // read cover file as data URL
        } else {
            // Show error message if file is not an image
            alert('Please select an image file for cover.');
            // Clear file input
            e.target.value = null;
        }
    };


    const onSubmit: SubmitHandler<FormValues> = async (data) => {

        if (Object.keys(errors).length === 0) {
            try {
                const formData = new FormData(); // create FormData object

                // Append data to FormData object
                formData.append('name', data.name);
                formData.append('about', data.about);
                formData.append('email', data.email);
                formData.append('phone', data.phone);
                formData.append('birth', data.birth);

                if (selectedThumb) {
                    formData.append('thumb', selectedThumb);
                }
                if (selectedCover) {
                    formData.append('cover', selectedCover);
                }
                const response = await axios.post("https://cool-ionized-skink.glitch.me/users", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data" // set content type to multipart/form-data
                    }
                });
                if (response.status === 201) {
                    router.push('/data');
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
            const response = await fetch("https://cool-ionized-skink.glitch.me/users");
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


    const nameValidation = (value: string) => {
        return /^[a-zA-Z\s]*$/.test(value) || "Name should not contain numbers or special characters.";
    };

    // Email Validation
    const emailValidation = (value: string) => {
        return /\S+@\S+\.\S+/.test(value) || "Please enter a valid email address.";
    };

    // Phone Validation
    const phoneValidation = (value: string) => {
        return /^\+(?:[0-9] ?){6,14}[0-9]$/.test(value) || "Please enter a valid phone number.";
    };


    return (
        <>
            <div className="flex  w-full justify-center items-center">
                <div className="my-10 p-10" style={{ width: "80%", background: 'white', borderRadius: "10px" }}>
                    <h3 className="text-2xl font-semibold mb-3">Profile Information</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-12">
                            <div className="border-gray-900/10 pb-12">
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    This information will be displayed publicly so be careful what you
                                    share.
                                </p>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register("name", { required: "Name is required", validate: nameValidation })}
                                                id="name"
                                                autoComplete="given-name"
                                                placeholder="John Doe"
                                                className={errors.name ? " block w-full px-[14px] rounded-md border-2 border-rose-500 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" : "block w-full px-[14px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                                            />
                                        </div>
                                        {errors.name && <span className="text-rose-600 dark:text-rose-500 text-sm">
                                            {errors?.name?.message}
                                        </span>}
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="birth"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Birth
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="date"
                                                {...register("birth", { required: "Birth is required" })}
                                                name="birth"
                                                id="birth"
                                                autoComplete="family-name"
                                                className={errors.birth ? " block w-full px-[14px] rounded-md border-2 border-rose-500 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" : "block w-full px-[14px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                                            />
                                        </div>
                                        {errors.birth && <span className="text-rose-600 dark:text-rose-500 text-sm">
                                            {errors?.name?.message}
                                        </span>}
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Email
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register("email", { required: "Email is required", validate: emailValidation })}
                                                id="email"
                                                autoComplete="given-name"
                                                placeholder="johndoe@gmail.com"
                                                className={errors.email ? " block w-full px-[14px] rounded-md border-2 border-rose-500 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" : "block w-full px-[14px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                                            />
                                        </div>
                                        {errors.email && <span className="text-rose-600 dark:text-rose-500 text-sm">
                                            {errors?.name?.message}
                                        </span>}
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Phone
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register("phone", { required: "Phone is required" })}
                                                id="phone"
                                                autoComplete="family-name"
                                                placeholder="+1 202-555-0136"
                                                className={errors.phone ? " block w-full px-[14px] rounded-md border-2 border-rose-500 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" : "block w-full px-[14px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                                            />
                                        </div>
                                        {errors.phone && <span className="text-rose-600 dark:text-rose-500 text-sm">
                                            {errors?.name?.message}
                                        </span>}
                                    </div>
                                    <div className="col-span-full">
                                        <label
                                            htmlFor="about"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            About
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                {...register("about", { required: "About is required" })}
                                                id="about"
                                                rows={3}
                                                className={errors.about ? "block w-full rounded-md border-2 px-[14px] border-rose-500 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" : "block w-full px-[14px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                                                defaultValue={""}
                                            />
                                        </div>
                                        {errors.about && <span className="text-rose-600 dark:text-rose-500 text-sm">
                                            {errors?.name?.message}
                                        </span>}
                                        <p className="mt-3 text-sm leading-6 text-gray-600">
                                            Write a few sentences about yourself.
                                        </p>
                                    </div>
                                    <div className="col-span-full">
                                        <label
                                            htmlFor="photo"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Photo
                                        </label>
                                        <div className="mt-2 flex items-center gap-x-3">
                                            <input ref={fileInputRef} onChange={handleThumbChange} type="file" className="hidden" />
                                            {thumbPreview && (
                                                <div
                                                    className="w-20 h-20 bg-cover bg-center rounded-md mb-2"
                                                    style={{ backgroundImage: `url(${thumbPreview})` }}
                                                />
                                            )}
                                            <button
                                                type="button"
                                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                onClick={handleButtonClick}
                                            >
                                                Change
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                        <label
                                            htmlFor="cover-photo"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Cover photo
                                        </label>
                                        <div style={{ backgroundPosition: 'center', backgroundImage: `linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url(${coverPreview})` }} className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-300"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label
                                                        htmlFor="cover"
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input
                                                            id="cover"
                                                            name="cover"
                                                            type="file"
                                                            onChange={handleCoverChange}
                                                            className="sr-only"
                                                        />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">
                                                    PNG, JPG, GIF up to 10MB
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                type="button"
                                className="text-sm font-semibold leading-6 text-gray-900"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
