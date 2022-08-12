import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import GoogleIcon from "../assets/icons/GoogleIcon";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
    const [inputs, setInputs] = useState({ email: "", password: "" });

    const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    return (
        <div className="w-full h-screen flex flex-column align-items-center pt-8 mt-5">
            <h2 className="font-normal text-4xl mb-4">Login</h2>
            <form className="w-full max-w-24rem flex flex-column">
                <span className="p-float-label h-3rem mb-4">
                    <InputText
                        value={inputs.email}
                        name="email"
                        onChange={handleInputsChange}
                        id="email"
                        className="h-3rem w-full text-sm"
                        type="email"
                    />
                    <label className="text-xs" htmlFor="email">
                        Email
                    </label>
                </span>
                <span className="p-float-label h-3rem mb-4">
                    <InputText
                        value={inputs.password}
                        name="password"
                        onChange={handleInputsChange}
                        id="password"
                        className="h-3rem w-full text-sm"
                        type="password"
                    />
                    <label className="text-xs" htmlFor="passsword">
                        Password
                    </label>
                </span>
                <Button label="Login" className="w-full mb-2 h-3rem" />
                <div className="flex justify-content-center mb-2 text-md">&</div>
                <Button className="flex justify-content-center h-3rem p-button-outlined p-button-secondary">
                    <GoogleIcon />
                    <span className="ml-4">Login with Google</span>
                </Button>
            </form>
            <div className="w-full max-w-24rem text-sm mt-3">
                Don't you have an account? <Link to='/signup' className="text-primary" >Signup</Link>
            </div>
        </div>
    );
};

export default Login;
