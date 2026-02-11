import {  useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";


export default function Register(){
    const [registerError, setRegisterError] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const registerUser = async (data) => {
        try{
            const res = await fetch('http://localhost:8800/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data)
            });

            if(!res.ok){
                setRegisterError(true);
                return false;
            }
            navigate('/login');
            

        }catch(err) {
            setRegisterError(true);
        }
    }
    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-200 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-950">Create Account</h2>
                    <p className="text-gray-500 mt-2">Please enter your details</p>
                </div>
                {registerError && <div className="text-red-500 text-center mb-4">Registration failed. Please try again.</div>}

                <form className="flex flex-col gap-5" onSubmit={handleSubmit(registerUser)}>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Name</label>
                        <input type="text"
                            {...register("name", {required: "Name is required"})}
                            required
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounder-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                        />
                    </div>
                    {errors.name && <p className="text-red-600">{errors.name.message}</p>}

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
                        <input type="email"
                            {...register("email", {required: "Email is required"})}
                            required
                            placeholder="johndoe@gmail.com"
                            className="w-full px-4 py-3 rounder-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                        />
                    </div>
                    {errors.email && <p className="text-red-600">{errors.email.message}</p>}

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                        <input type="password"
                            {...register("password", {required: "Password is required"})}
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounder-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                        />
                    </div>
                    {errors.password && <p className="text-red-600">{errors.password.message}</p>}

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Confirm Password</label>
                        <input type="password"
                            {...register("confirmPassword", {required: "Confirm Password is required"})}
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounder-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                        />
                    </div>

                    

                    <button type="submit" className="w-full bg-blue-950 text-white font-bold py-3 rounded-lg hover:bg-blue-900 transform transition-active active:scale-[0.98] shadow-lg mt-2 cursor-pointer">
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-blue-600 mt-8 text-sm">
                    Already have an account? 
                    <a href="/login" className="text-blue-600 font-bold ml-1 hover:underline">Login</a>
                </p>

                
            </div>

        </div>
    );
}