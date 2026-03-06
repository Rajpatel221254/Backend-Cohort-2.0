import React from 'react'
import { useSong } from '../hooks/useSong'
import Player from '../components/Player'
import FaceExpression from '../../expression/components/FaceExpression'
import SongsList from '../components/SongsList'
import './home.scss'

const Home = () => {

    const { handleGetSong } = useSong()

    return (
        <div className="home-container">
            <div className="home-section expression-section">
                <FaceExpression
                    onClick={(expression) => { handleGetSong({ mood: expression }) }}
                />
            </div>
            
            <div className="home-section songs-section">
                <SongsList />
            </div>

            <div className="home-section player-section">
                <Player />
            </div>
        </div>
    )
}

export default Home