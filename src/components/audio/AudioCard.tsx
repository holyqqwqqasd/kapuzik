import { useRef, useState } from 'react'
import Pause from '../images/pause.tsx'
import Play from '../images/play.tsx'
import ProgressBar from './ProgressBar.tsx'
import './AudioCard.css'

export default function () {
    const [playing, setPlaying] = useState(false)
    const [position, setPosition] = useState(0)
    const [duration, setDuration] = useState(0)
    const audioRef = useRef<HTMLAudioElement>(null)

    const middleButton = playing
        ? <Pause
            size={35}
            color="white"
            onClick={() => {
                audioRef.current!.pause()
            }}
        />
        : <Play
            size={35}
            color="white"
            onClick={() => {
                audioRef.current!.play()
            }}
        />

    return (
        <div className="audio-container">
            <span className="audio-progress">
                <ProgressBar
                    position={position}
                    duration={duration}
                    selected={x => {
                        audioRef.current!.currentTime = duration * x
                    }}
                />
            </span>
            <div className="audio-divider" />
            <span className="audio-button audio-buttons">
                {middleButton}
            </span>
            <audio
                ref={audioRef}
                onTimeUpdate={e => {
                    const audio = e.currentTarget

                    setPosition(audio.currentTime)
                }}
                onPause={e => {
                    const audio = e.currentTarget

                    setPlaying(false)
                }}
                onPlay={e => {
                    const audio = e.currentTarget

                    setPlaying(true)
                    setDuration(audio.duration)
                }}
                src="http://music.kapehh.net:8787/Rammstein/Auslander.flac"
            />
        </div>
    )
}