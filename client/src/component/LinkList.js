import React from 'react';
import { Link } from 'react-router-dom';

export const LinkList = ({ links }) => {
    if (!links.length) {
        return <h1>No links</h1>
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>to link</th>
                        <th>from link</th>
                        <th>open</th>
                    </tr>
                </thead>

                <tbody>
                    {links.map((link, index) => {
                        return (
                            <tr key={link._id}>
                                <td>{index + 1}</td>
                                <td>{link.to}</td>
                                <td>{link.from}</td>
                                <td>
                                    <Link to={`/detail/${link._id}`}>open</Link>
                                </td>
                            </tr>
                        )
                    })
                    }

                </tbody>
            </table>
        </>
    )
}