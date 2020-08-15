import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/httpHook';
import { LinkList } from '../component/LinkList';
import { AuthContext } from '../Context/authContext';
import { Loading } from '../component/Loading';

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const { loading, request } = useHttp();
    const { token  } = useContext(AuthContext)

    const getLinks = useCallback( async () => {
        try {
            const data = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(data)
        } catch (error) {}
    }, [request, token])

    useEffect(() => {
        getLinks();
    }, [getLinks])

    if (loading) {
        return <Loading />
    }

    return (
        <>
            { !loading && <LinkList links={links} /> }
        </>
    )
}