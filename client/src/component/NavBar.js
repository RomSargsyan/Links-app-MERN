import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../Context/authContext'

export const NavBar = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
                <a href="/" className="brand-logo">Logo</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create" style={{ fontSize: '1.5rem' }}>Create</NavLink></li>
                    <li><NavLink to="/links" style={{ fontSize: '1.5rem' }}>Links</NavLink></li>
                    <li><a href="/" onClick={logoutHandler} style={{ fontSize: '1.5rem' }}>Logout</a></li>
                </ul>
            </div>
        </nav>
    )
}