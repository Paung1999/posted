import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useApp } from "../providers/AppProvider";


export default function Login() {
  const [loginError, setLoginError] = useState(false);
  const {setAuth} = useApp();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const login = async (data) => {
    try{
      const res = await fetch('http://localhost:8800/users/login',{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
      });
      if(!res.ok){
        setLoginError(true)
        return false;
      }

      const {user:loginUser , token} = await res.json();
      localStorage.setItem('token', token);
      const verifyRes = await fetch('http://localhost:8800/users/verify', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if(verifyRes.ok){
        const user = await verifyRes.json();
        setAuth(user);
        navigate('/');
      }

    }catch(err){
      setLoginError(true);
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 dark:bg-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-950 dark:text-gray-200">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-200 mt-2">Please enter your details</p>
        </div>

        {loginError && <div className="text-red-500 text-center mb-4">Login failed. Please check your credentials.</div>}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(login)}>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 ml-1">
              Email Address
            </label>
            <input 
              type="email" 
              {...register("email", { required: "Email is required" })}
              placeholder="name@company.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
            />
          </div>
          {errors.email && <p className="text-red-600">{errors.email.message}</p> }

         
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 ml-1">
              Password
            </label>
            <input 
              type="password" 
              {...register("password", { required: "Password is required" })}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
            />
          </div>
          {errors.password && <p className="text-red-600">{errors.password.message}</p> }


          {/* Helper Links */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-blue-600" />
              <span className="text-gray-600 dark:text-gray-200">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 dark:text-gray-200 hover:underline font-medium">Forgot password?</a>
          </div>

          
          <button 
            type="submit"
            className="w-full bg-blue-950 dark:bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-900 transform transition-active active:scale-[0.98] shadow-lg mt-2 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        
        <p className="text-center text-gray-600 dark:text-gray-200 mt-8 text-sm">
          Don't have an account? 
          <a href="/register" className="text-blue-600 font-bold ml-1 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}