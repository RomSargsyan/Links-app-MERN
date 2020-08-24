import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/httpHook'
import { useMessage } from '../hooks/messageHook'
import { AuthContext } from '../Context/authContext'

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp();
    const [form, setForm] = useState({
        email: "", password: ""
    });

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
        } catch (e) { }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
        } catch (err) { }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h2>Shorten the link</h2>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authiaction</span>
                        <div>
                            <label htmlFor="Email">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={form.email}
                                placeholder="Please enter your email-adress"
                                onChange={changeHandler}
                            />
                        </div>
                        <div>
                            <label htmlFor="Password">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={form.password}
                                placeholder="Please enter your password"
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="card-action">
                            <button
                                onClick={loginHandler}
                                className="btn blue lighten-2 sign-in"
                                disabled={loading}
                            >
                                Sign in
                            </button>
                            <button
                                onClick={registerHandler}
                                className="btn indigo darken-1"
                                disabled={loading}
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

