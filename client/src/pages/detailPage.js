import { useParams } from 'react-router-dom'
import React, { useEffect, useCallback, useState, useContext } from 'react'
import { useHttp } from '../hooks/httpHook'
import { Loading } from '../component/Loading'
import { LinkCard } from '../component/LinkCard'
import { AuthContext } from '../Context/authContext'


export const DetailPage = () => {
    const { loading, request } = useHttp();
    const { token } = useContext(AuthContext)
    const [link, setLink] = useState(null)
    const linkId = useParams().id

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(fetched)
        } catch (error) { }
    }, [request, token, linkId])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (loading) {
        return <Loading />
    }
    return (
        <div>
            {!loading && link && <LinkCard link={link} />}
        </div>
    )
}