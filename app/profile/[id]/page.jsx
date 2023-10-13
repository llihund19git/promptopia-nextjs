'use client';

import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const OtherProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);



    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`/api/users/${id}`);
            const data = await response.json();
            setUser(data);
            console.log(data);
        }
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${id}/posts`);
            const data = await response.json();
            setPosts(data);
        }

        fetchUser();
        fetchPosts();
    }, [])

    if (!user) {
        return <></>
    };

    return (
        <Profile
            name={user.username}
            desc="Welcome to your personalizied profile page"
            data={posts}
        />
    )
}

export default OtherProfile