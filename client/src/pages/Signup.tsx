import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
    const [inputs, setInputs] = useState({ fullName: "", email: "", password: "" });

    const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    return (
        <div className="w-full h-screen flex flex-column align-items-center pt-8 mt-5">
            <h2 className="font-normal text-4xl mb-4">Signup</h2>
            <form className="w-full max-w-24rem flex flex-column">
                <span className="p-float-label h-3rem mb-4">
                    <InputText
                        value={inputs.fullName}
                        name="fullName"
                        onChange={handleInputsChange}
                        id="fullName"
                        className="h-3rem w-full text-sm"
                        type="text"
                    />
                    <label className="text-xs" htmlFor="email">
                        Full Name
                    </label>
                </span>
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
                <Button label="Signup" className="w-full mb-2 h-3rem" />
            </form>
            <div className="w-full max-w-24rem text-sm mt-3">
                Already have account? <Link to='/login' className="text-primary" >Login</Link>
            </div>
        </div>
    );
};

export default Signup;
