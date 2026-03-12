import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})

async function createPost(formData) {
    const response = await api.post('/api/post',formData)
    return response.data
}

async function getPostsByUserId() {
    const response = await api.get(`/api/post`)
    return response.data
}

async function likePost(id) {
    const response = await api.post(`/api/post/like/${id}`)
    return response.data
}

async function getPostDetails(id) {
    const response = await api.get(`/api/post/${id}`)
    return response.data
}

async function getUserDetails(){
    const response = await api.get(`/api/auth/me`)
    return response.data
}

async function getAllPost(){
    const response = await api.get(`/api/post/all`)
    return response.data
}

export { createPost, getPostsByUserId, likePost, getPostDetails, getUserDetails, getAllPost }