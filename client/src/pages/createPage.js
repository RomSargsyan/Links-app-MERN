import React, { useState, useContext } from 'react';
import { useHttp } from '../hooks/httpHook';
import { AuthContext } from '../Context/authContext'

export const CreatePage = () => {
    const auth = useContext(AuthContext)
    const { request } = useHttp()
    const [link, setLink] = useState()

    const pressHandler = async (event) => {
        if (event.key === "Enter") {
            const data = await request('/api/link/generate', 'POST', { from: link }, {
                Authorization: `Bearer ${auth.token}`
            })
            console.log(data);
        }
    }

    return (
        <div>
            <div className="col-s8 offset-s2">
                <label htmlFor="Link">Link</label>
                <input
                    id="link"
                    type="text"
                    name="link"
                    placeholder="Types link"
                    onChange={e => setLink(e.target.value)}
                    onKeyPress={pressHandler}
                />
            </div>
        </div>
    )
}