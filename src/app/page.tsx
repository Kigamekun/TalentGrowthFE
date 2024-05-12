'use client';

import Image from "next/image";
import Modal from "./components/modal";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  birth: string;
};


export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>()
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
    <div>


      <div className="mx-auto my-20 card w-10/12 p-5 bg-base-100 shadow-xl">

        <div className="flex justify-between">
          <h2 className="card-title mb-10">Form Data</h2>

          <button className="btn btn-primary text-white" onClick={() => {
            const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
            if (modal) {
              modal.showModal();
            }
          }}>Create</button>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any, key: number) => (
                <tr key={key}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user.phone}
                    
                  </td>
                  <td>{user.address}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th></th>
              </tr>
            </tfoot>

          </table>
        </div>

      </div>


      <dialog id="my_modal_1" className="modal ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-box ">
            <label className={errors.name ? "input input-bordered flex items-center gap-2 input-error" : "input input-bordered flex items-center gap-2"}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
              <input type="text" className="grow" placeholder="name" {...register("name", { required: true })} />
            </label>
            {errors.name && <label className="label text-sm text-red-500 label-error">name is required</label>}
            <label className="input input-bordered flex items-center mt-3 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
              <input type="text" className="grow" placeholder="Phone" {...register("phone", { required: true })} />
            </label>
            {errors.phone && <label className="label text-sm text-red-500 label-error">Phone is required</label>}
            <label className="input input-bordered flex items-center mt-3 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
              <input type="text" className="grow" placeholder="Email" {...register("email", { required: true })} />
            </label>
            {errors.email && <label className="label text-sm text-red-500 label-error">Email is required</label>}
            <label className="input input-bordered flex items-center mt-3 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
              <input type="password" className="grow" value="password" {...register("password", { required: true })} />
            </label>
            {errors.password && <label className="label text-sm text-red-500 label-error">Password is required</label>}
            <br />
            <textarea className="textarea textarea-bordered grow w-full" placeholder="Address" {...register("address", { required: true })} ></textarea>
            {errors.address && <label className="label text-sm text-red-500 label-error">Address is required</label>}
            <br />
            <label className="input input-bordered flex items-center mt-3 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
              <input type="date" className="grow" placeholder="Birth"  {...register("birth", { required: true })} />
            </label>
            {errors.birth && <label className="label text-sm text-red-500 label-error">Birth is required</label>}
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button type="button" className="btn" onClick={() => {
                const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                if (modal) {
                  modal.close();
                }
              }}>Close</button>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </dialog>
    </div>



  );
}
