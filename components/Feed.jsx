'use client';

import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard';


const PrompCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);

    const hanndleSearchChanged = (e) => {
        const text = e.target.value;
        setSearchText(text);
        fetchSearchPosts(text);
    };

    const fetchSearchPosts = async (searchText) => {
        const response = await fetch('/api/prompt/search', {
            method: 'POST',
            body: JSON.stringify({ searchText })
        });

        const data = await response.json();
        setPosts(data);
    }

    const fetchTagPosts = async (tag) => {
        setSearchText("#" + tag);
        const response = await fetch('/api/prompt/searchTag', {
            method: 'POST',
            body: JSON.stringify({ tag })
        });

        const data = await response.json();
        setPosts(data);
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();
            setPosts(data);
        }

        fetchPosts();
    }, [])

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type="text"
                    placeholder='Search for a tag or a username'
                    value={searchText}
                    onChange={hanndleSearchChanged}
                    required
                    className='search_input peer'
                />
            </form>

            <PrompCardList
                data={posts}
                handleTagClick={fetchTagPosts}
            />
        </section>
    )
}

export default Feed