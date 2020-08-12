import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/httpHook';
import { useMessage } from '../hooks/messageHook';
import { AuthContext } from '../Context/authContext';

export const AuthPage = () => {
    const {loading, request, error, clearError } = useHttp();
    const [form, setForm] = useState({
        email: "", password: ""
    });
    const auth = useContext(AuthContext);
    const message = useMessage()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
           const data = await request('/api/auth/register', 'POST', {...form} )
           message(data.message)
        } catch (error) {}
    }
    
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form} )
            auth.login(data.token, data.userId)
        } catch (error) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authiaction</span>
                        <div>
                            <label htmlFor="Email">Email</label>
                            <input 
                                id="email" 
                                type="email" 
                                name="email"
                                placeholder="Type Email"
                                onChange={changeHandler} 
                            />
                        </div>
                        <div>
                            <label htmlFor="Password">Password</label>
                            <input 
                                id="password" 
                                type="password" 
                                name="password"
                                placeholder="Type Password"
                                onChange={changeHandler}  
                            />
                            
                        </div>
                        <div className="card-action">
                            <button 
                                onClick={loginHandler} 
                                className="btn  blue lighten-2 sign-in"
                                disabled={loading}
                            >
                                Sign in
                            </button>
                            <button 
                                onClick={registerHandler} 
                                className="btn  indigo darken-1"
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