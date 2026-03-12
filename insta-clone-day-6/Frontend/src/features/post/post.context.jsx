import {createContext, useState} from 'react'

export const PostContext = createContext();

export const PostContextProvider = ({children})=>{
    const [posts,setPosts] = useState([])
    const [user, setUser] = useState(null)
    const [loading,setLoading] = useState(false)

    return (
        <PostContext.Provider value={{posts,setPosts,loading,setLoading,user,setUser}}>
            {children}
        </PostContext.Provider>
    )
}