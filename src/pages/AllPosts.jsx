import React, { useEffect, useState } from "react";
import appwriteService from '../appwrite/config'
import { Container, PostCard } from "../components";


function AllPosts(){
    const [posts, setPosts] = useState([])
    useEffect(() => {

    }, [])
    appwriteService.getPosts([]).then((posts) => {
        if(posts){
            setPosts(posts.documents)
        }
    })
    return (
        <div className="w-full py-8">
            <Container>
                {posts.map((post) => (
                    <PostCard key={post.$id} post={post} />
                ))}
            </Container>
        </div>
    )
}

export default AllPosts