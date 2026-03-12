import {createPost, getPostDetails, getPostsByUserId, likePost, getUserDetails, getAllPost} from '../services/post.api'
import {useContext, useEffect} from 'react'
import {PostContext} from '../post.context'

export const usePost = ()=>{
    const {posts, setPosts, loading, setLoading, user, setUser} = useContext(PostContext);

    const handleCreatePost = async (formData)=>{
        setLoading(true)
        const data = await createPost(formData)
        setPosts((prev)=>[data,...prev])
        setLoading(false)
    }

    const handleGetPostsByUserId = async ()=>{
        setLoading(true)
        const data = await getPostsByUserId()
        setPosts(data)
        setLoading(false)
    }

    const handleLikePost = async (id)=>{
        setLoading(true)
        const data = await likePost(id)
        setPosts((prev)=>prev.map((post)=>post._id === id ? data : post))
        setLoading(false)
    }

    const handleGetPostDetails = async (id)=>{
        setLoading(true)
        const data = await getPostDetails(id)
        setLoading(false)
        return data
    }

    const handleGetMe = async ()=>{
        setLoading(true)
        const data = await getUserDetails()
        setUser(data.user)
        setLoading(false)
    }

    const handleGetAllPost = async ()=>{
        setLoading(true)
        const data = await getAllPost()
        setPosts(data.posts)
        setLoading(false)
    }

    return {
        user,
        posts,
        loading,
        handleGetAllPost,
        handleCreatePost,
        handleGetPostsByUserId,
        handleLikePost,
        handleGetPostDetails
    }
}