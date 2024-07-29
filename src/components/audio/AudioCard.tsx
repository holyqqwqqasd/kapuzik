import { useRef, useState, useTransition } from 'react'
import Pause from '../images/pause.tsx'
import Play from '../images/play.tsx'
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
            <span className="audio-button">
                {middleButton}
            </span>
            <input
                type="range"
                min={0} max={duration}
                value={position}
                onChange={e => {
                    audioRef.current!.currentTime = e.currentTarget.valueAsNumber
                }}
            />
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
                onSeeked={e => {
                    const audio = e.currentTarget
                }}
                src="http://music.kapehh.net:8787/Rammstein/Auslander.flac"
            />
        </div>
    )
}