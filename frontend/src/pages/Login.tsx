// Local Imports
import ButtonSubmit from "../components/ButtonSubmit";
import Textbox from "../components/Textbox";
import { loginSchema } from "../utils/auth.schema";

import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import ButtonLoading from "../components/ButtonLoading";

type LoginProps = z.infer<typeof loginSchema>;

axios.defaults.withCredentials = true;

export default function Landing() {
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginProps>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginProps) => {
        try {
            setLoading(true);
            await axios.post("/api/auth/login", {
                email: data.email,
                password: data.password,
            });
            navigate("/");
        } catch (error) {
            console.log(error);
            setIsError(true);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen min-w-screen flex">
            <div className="mx-auto self-center flex bg-white rounded-lg shadow-lg overflow-hidden sm:w-3/5 md:max-w-lg lg:max-w-4xl lg:max-h-3/5 lg:w-[450px]">

                <div className="w-full p-8">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">
                        Mental Aquarium
                    </h2>
                    <p className="text-xl text-gray-600 text-center">Welcome back!</p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-8">
                            <label className="block text-gray-700 text-sm mb-2">
                                Email Address
                            </label>
                            <Textbox
                                id="email"
                                {...register("email")}
                                name="email"
                                type="email"
                                autoComplete="email"
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-sm mb-2">Password</label>
                                <Link to="/reset-password" className="text-xs font-normal text-indigo-600 hover:underline h-fit">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Textbox
                                id="password"
                                {...register("password")}
                                name="password"
                                type="password"
                                autoComplete="password"
                            />
                            {errors.password && (
                                <p className="text-red-600 text-sm">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {isError && <p className="text-red-600 text-sm mt-4">Invalid email or password</p>}

                        <div className="mt-8" title="Sign-In">
                            {/* <ButtonPrimary text="Sign-In" url="/dashboard" /> */}
                            {loading ?
                                <ButtonLoading /> : <ButtonSubmit text="Sign-In" />}
                        </div>
                    </form>

                    <div className="mt-4 flex gap-1 items-center justify-center">
                        <Link
                            to="/register"
                            className="text-xs text-indigo-600 hover:text-indigo-300 font-bold"
                        >
                            Don't Have an Account? Register Here!
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
