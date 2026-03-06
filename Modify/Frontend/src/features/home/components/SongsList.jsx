import React from 'react'
import { useSong } from '../hooks/useSong'
import SongCard from './SongCard'
import './songslist.scss'

const SongsList = () => {
    const { songs, loading } = useSong()

    if (loading) {
        return (
            <div className="songs-list-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading songs...</p>
                </div>
            </div>
        )
    }

    if (!songs || songs.length === 0) {
        return (
            <div className="songs-list-container">
                <div className="empty-state">
                    <p>No songs found. Select a mood to get started!</p>
                </div>
            </div>
        )
    }

    return (
        <div className="songs-list-container">
            <div className="songs-list">
                {songs.map((song, index) => (
                    <SongCard key={index} song={song} />
                ))}
            </div>
        </div>
    )
}

export default SongsList
