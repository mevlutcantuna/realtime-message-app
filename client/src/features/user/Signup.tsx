import React, { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Link, useNavigate } from 'react-router-dom'
import { isLoggedin } from '../../lib/utils'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { auth } from '../../app/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const Signup: React.FC = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)

    const signup = async (
        fullName: string,
        email: string,
        password: string
    ) => {
        setLoading(true)
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(auth.currentUser, {
                displayName: fullName,
            })
            setLoading(false)
            toast.success('Signup success.')
            navigate('/login', { replace: true })
        } catch (error: any) {
            setLoading(false)
            return toast.error(error.code)
        }
    }

    const formik: any = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
        },
        validate: (data) => {
            let errors: any = {}

            if (!data.fullName) {
                errors.fullName = 'Full name is required.'
            }

            if (!data.email) {
                errors.email = 'Email is required.'
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
            ) {
                errors.email = 'Invalid email address. E.g. example@email.com'
            }

            if (!data.password) {
                errors.password = 'Password is required.'
            }

            return errors
        },
        onSubmit: (data) => {
            //formik.resetForm();
            signup(data.fullName, data.email, data.password)
        },
    })

    useEffect(() => {
        // if user is logged in, redirect to home page
        if (isLoggedin()) navigate('/', { replace: true })
    }, [navigate])

    const isFormFieldValid = (name: string) =>
        !!(formik.touched[name] && formik.errors[name])
    const getFormErrorMessage = (name: string) => {
        return (
            isFormFieldValid(name) && (
                <small className="p-error text-xs w-full flex align-items-center justify-content-end mt-1">
                    {formik.errors[name]}
                </small>
            )
        )
    }

    return (
        <div className="w-full h-screen flex flex-column align-items-center pt-8 mt-5">
            <h2 className="font-normal text-4xl mb-4">Signup</h2>
            <form
                onSubmit={formik.handleSubmit}
                className="w-full max-w-24rem flex flex-column"
            >
                <span className="p-float-label h-3rem mb-4">
                    <InputText
                        value={formik.values.fullName}
                        name="fullName"
                        onChange={formik.handleChange}
                        id="fullName"
                        data-testid="fullName"
                        className="h-3rem w-full text-sm"
                        type="text"
                    />
                    <label className="text-xs" htmlFor="fullName">
                        Full Name
                    </label>
                    {getFormErrorMessage('fullName')}
                </span>
                <span className="p-float-label h-3rem mb-4">
                    <InputText
                        value={formik.values.email}
                        name="email"
                        onChange={formik.handleChange}
                        id="email"
                        className="h-3rem w-full text-sm"
                        data-testid="email"
                    />
                    <label className="text-xs" htmlFor="email">
                        Email
                    </label>
                    {getFormErrorMessage('email')}
                </span>
                <span className="p-float-label h-3rem mb-4">
                    <InputText
                        value={formik.values.password}
                        name="password"
                        onChange={formik.handleChange}
                        id="password"
                        data-testid="password"
                        className="h-3rem w-full text-sm"
                        type="password"
                    />
                    <label className="text-xs" htmlFor="password">
                        Password
                    </label>
                    {getFormErrorMessage('password')}
                </span>
                <Button
                    loading={loading}
                    type="submit"
                    label="Signup"
                    className="w-full mb-2 h-3rem"
                    disabled={
                        formik.values.email === '' ||
                        formik.values.password === '' ||
                        formik.values.fullName === ''
                    }
                />
            </form>
            <div className="w-full max-w-24rem text-sm mt-3">
                Already have account? &nbsp;
                <Link to="/login" className="text-primary">
                    Login
                </Link>
            </div>
        </div>
    )
}

export default Signup
