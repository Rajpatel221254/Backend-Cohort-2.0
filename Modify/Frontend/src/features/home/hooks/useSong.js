import { getSongs } from "../services/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";

export const useSong = () => {
    const context = useContext(SongContext)

    const { loading, setLoading, song, setSong, songs, setSongs } = context

    async function handleGetSong({ mood }) {
        setLoading(true)
        const data = await getSongs({ mood })
        
        setSong(data.songs[0])
        setSongs(data.songs)
        setLoading(false)
    }

    return ({ loading, song, handleGetSong, songs })

}