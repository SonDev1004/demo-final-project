import React, {useEffect} from 'react';
import {useForm, Controller} from "react-hook-form";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {loginRequest} from "../../redux/actin/authAction.js";
import { yupResolver } from '@hookform/resolvers/yup';
import{toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const schema = yup.object({
    email: yup.string()
        .required("Email is required")
        .email("Email must be a valid email"),
    password: yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
})

function Login() {
    const dispatch = useDispatch();
    const {error, isLogin, loading} = useSelector((state) => state.auth);
    const {control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues:{
            email: '',
            password: ''
        }
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            toast.success("Login successful");
            navigate('/');
        }
    }, [isLogin, navigate]);

    const handleLogin = (data) => {
        dispatch(loginRequest(data))
    }

    if (isLogin) return null;
    return (
        // <div className="container mx-auto h-[calc(100vh-128px)] flex items-center justify-center">
        <div className='container mx-auto h-[calc(100vh-128px)]'>
            <div className="flex flex-col items-center font-semibold mb-2">
                <h1 className="text-3xl font-bold py-4">
                    Login Page
                </h1>
                <form class="w-full sm:w-2/3 lg:w-2/5" onSubmit={handleSubmit(handleLogin)}>
                    <div className="flex flex-col items-start mb-4 w-full">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                            Email:
                        </label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    id="email"
                                    autoComplete="off"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    {...field}
                                />
                            )}
                        />
                        {errors.email && (<p className="text-red-600">{errors.email.message}</p>)}
                    </div>
                    <div className="flex flex-col items-start mb-4 w-full">
                        <label htmlFor="password"
                               className="block text-gray-700  text-sm font-semibold mb-2">
                            Password:
                        </label>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="password"
                                    id="password"
                                    autoComplete="off"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    {...field}
                                />
                            )}
                        />
                        {errors.password && (<p className="text-red-600">{errors.password.message}</p>)}
                    </div>
                    <button type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4
                             rounded transition duration-200"
                            disabled={loading}
                    >Login
                    </button>
                    {error && (
                        <div style={{color: 'red'}}>{error}</div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Login;