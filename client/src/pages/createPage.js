import React, { useState } from 'react';
import { useHttp } from '../hooks/httpHook';

export const CreatePage = () => {
    const request = useHttp()
    const [link, setLink] = useState()

        const pressHandler = async (event) => {
            if (event.key === "Enter") {
                const data = await request('/api/links/generate', 'POST', {from: link})
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
                    value={link}
                    placeholder="Types link"
                    onChange={e => setLink(e.target.value)}
                    onKeyPress={pressHandler}
                />
            </div>
        </div>
    )
}