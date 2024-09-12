import Pause from '../images/pause.tsx'
import Play from '../images/play.tsx'
import ProgressBar from './ProgressBar.tsx'
import './AudioCard.css'

interface State {
    currentTrack: Track
    playing: boolean
    progress: number
    duration: number
    onPlay: () => void
    onPause: () => void
    onProgressSeeked: (x: number) => void
}

function fromNumberToTime(x: number) {
    const duration = Math.floor(x)
    const minutes = Math.floor(duration / 60)
    const seconds = duration - minutes * 60
    const m = minutes < 10 ? `0${minutes}` : minutes
    const s = seconds < 10 ? `0${seconds}` : seconds

    return `${m}:${s}`
}

export default function ({
    currentTrack,
    playing,
    progress,
    duration,
    onPause,
    onPlay,
    onProgressSeeked
}: State) {

    const middleButton = playing
        ? <Pause
            size={35}
            color="#fe6060"
            onClick={onPause}
        />
        : <Play
            size={35}
            color="#fe6060"
            onClick={onPlay}
        />

    return (
        <div className="audio-container">
            <div className="audio-cover">
                <img src={currentTrack.cover ?? '#'}></img>
            </div>
            <div className="audio-info">
                <div>{currentTrack.name}</div>
                <div><strong>{currentTrack.artist}</strong></div>
            </div>
            <div className="audio-controls">
                <div className="audio-buttons">
                    <span className="audio-button">{middleButton}</span>
                    <span className="audio-button">{middleButton}</span>
                </div>
                <div className="audio-progress">
                    <div className="audio-current-time">{fromNumberToTime(progress)}</div>
                    <div className="audio-progress-bar">
                        <ProgressBar
                            position={progress}
                            duration={duration}
                            selected={x => onProgressSeeked(duration * x)}
                        />
                    </div>
                    <div className="audio-duration-time">{fromNumberToTime(duration)}</div>
                </div>
            </div>
        </div>
    )
}