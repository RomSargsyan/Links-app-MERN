import React from 'react';

export const LinkCard = ({ link }) => {
    if (!Object.keys(link).length) {
        return <h1>No Links</h1>
    }

    return (
        <div>
            <h1>Links</h1>
            <p>Your link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>From link: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Clicks count: <strong>{link.clicks}</strong> </p>
            <p>Date: <strong>{link.date}</strong></p>
        </div>
    )
}