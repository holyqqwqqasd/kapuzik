import { useRef, useState } from 'react'
import Pause from '../images/pause.tsx'
import Play from '../images/play.tsx'
import ProgressBar from './ProgressBar.tsx'
import './AudioCard.css'

interface State {
    currentTrack?: Track
    onNextTrack?: () => void
}

function fromNumberToTime(x: number) {
    const duration = Math.floor(x)
    const minutes = Math.floor(duration / 60)
    const seconds = duration - minutes * 60
    const m = minutes < 10 ? `0${minutes}` : minutes
    const s = seconds < 10 ? `0${seconds}` : seconds

    return `${m}:${s}`;
}

export default function (props: State) {
    const [playing, setPlaying] = useState(false)
    const [position, setPosition] = useState(0)
    const [duration, setDuration] = useState(0)
    const audioRef = useRef<HTMLAudioElement>(null)

    if (!props.currentTrack) {
        return <></>
    }

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
                if (props.currentTrack) {
                    audioRef.current!.play()
                }
            }}
        />

    return (
        <div className="audio-container">
            <div className="audio-info">{props.currentTrack?.name}</div>
            <div className="audio-controls">
            <div className="audio-current-time">{fromNumberToTime(position)}</div>
            <div className="audio-duration-time">{fromNumberToTime(duration)}</div>
                <div className="audio-progress">
                    <ProgressBar
                        position={position}
                        duration={duration}
                        selected={x => {
                            audioRef.current!.currentTime = duration * x
                        }}
                    />
                </div>
                <div className="audio-buttons">
                    <span className="audio-button">{middleButton}</span>
                </div>
                <audio
                    ref={audioRef}
                    autoPlay={true}
                    onTimeUpdate={e => {
                        const audio = e.currentTarget

                        setPosition(audio.currentTime)
                    }}
                    onPause={_ => {
                        setPlaying(false)
                    }}
                    onPlay={_ => {
                        setPlaying(true)
                    }}
                    onLoadedData={e => {
                        const audio = e.currentTarget

                        setDuration(audio.duration)
                    }}
                    onEnded={_ => {
                        if (props.onNextTrack) {
                            props.onNextTrack()
                        }
                    }}
                    src={props.currentTrack?.url}
                />
            </div>
        </div>
    )
}