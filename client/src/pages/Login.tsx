import React, { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import GoogleIcon from "../assets/icons/GoogleIcon";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedin } from "../lib/utils";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserLoading } from "../store/auth";


const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const loading: any = useSelector<any>(state => state.auth.loading)

    const login = async (email: string, password: string) => {
        dispatch(setUserLoading(true))
        try {
            const res: any = await signInWithEmailAndPassword(auth, email, password)
            dispatch(setUser(res.user))
            dispatch(setUserLoading(false))
            return navigate('/', { replace: true })
        } catch (error: any) {
            dispatch(setUser(false))
            dispatch(setUserLoading(false))
            return toast.error(error.code)
        }
    }

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            navigate('/')
        } catch (error: any) {
            return toast.error(error.code)
        }
    }

    const formik: any = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate: (data) => {
            let errors: any = {};

            if (!data.email) {
                errors.email = "Email is required.";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
            ) {
                errors.email = "Invalid email address. E.g. example@email.com";
            }

            if (!data.password) {
                errors.password = "Password is required.";
            }

            return errors;
        },
        onSubmit: (data) => {
            //formik.resetForm();
            login(data.email, data.password)
        },
    });

    useEffect(() => {
        // if user is logged in, redirect to home page
        if (isLoggedin()) navigate("/", { replace: true });
    }, [navigate]);

    const isFormFieldValid = (name: string) =>
        !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name: string) => {
        return (
            isFormFieldValid(name) && (
                <small className="p-error text-xs w-full flex align-items-center justify-content-end mt-1">
                    {formik.errors[name]}
                </small>
            )
        );
    };

    return (
        <div className="w-full h-screen flex flex-column align-items-center pt-8 mt-5">
            <h2 className="font-normal text-4xl mb-4">Login</h2>
            <form
                onSubmit={formik.handleSubmit}
                className="w-full max-w-24rem flex flex-column"
            >
                <span className="p-float-label h-3rem mb-4">
                    <InputText
                        value={formik.values.email}
                        name="email"
                        onChange={formik.handleChange}
                        id="email"
                        className="h-3rem w-full text-sm"
                    />
                    <label className="text-xs" htmlFor="email">
                        Email
                    </label>
                    {getFormErrorMessage("email")}
                </span>
                <span className="p-float-label h-3rem mb-4 ">
                    <InputText
                        value={formik.values.password}
                        name="password"
                        onChange={formik.handleChange}
                        id="password"
                        className="h-3rem w-full text-sm"
                        type="password"
                    />
                    <label className="text-xs" htmlFor="passsword">
                        Password
                    </label>
                    {getFormErrorMessage("password")}
                </span>
                <Button
                    loading={loading}
                    type="submit"
                    label="Login"
                    className="w-full mb-2 h-3rem"
                    disabled={formik.values.email === "" || formik.values.password === ""}
                />

            </form>
            <div className="flex justify-content-center mb-2 text-md">&</div>
            <div className="w-full max-w-24rem">
                <Button onClick={loginWithGoogle} className="w-full flex justify-content-center h-3rem p-button-outlined p-button-secondary">
                    <GoogleIcon />
                    <span className="ml-4">Login with Google</span>
                </Button>
            </div>
            <div className="w-full max-w-24rem text-sm mt-3">
                Don't you have an account? &nbsp;
                <Link to="/signup" className="text-primary">
                    Signup
                </Link>
            </div>
        </div>
    );
};

export default Login;
