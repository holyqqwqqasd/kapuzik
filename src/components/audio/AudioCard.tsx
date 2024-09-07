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

    return `${m}:${s}`;
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
            color="white"
            onClick={onPause}
        />
        : <Play
            size={35}
            color="white"
            onClick={onPlay}
        />

    return (
        <div className="audio-container footer">
            <div className="audio-info">{currentTrack?.name}</div>
            <div className="audio-controls">
                <div className="audio-current-time">{fromNumberToTime(progress)}</div>
                <div className="audio-duration-time">{fromNumberToTime(duration)}</div>
                <div className="audio-progress">
                    <ProgressBar
                        position={progress}
                        duration={duration}
                        selected={onProgressSeeked}
                    />
                </div>
                <div className="audio-buttons">
                    <span className="audio-button">{middleButton}</span>
                    <span className="audio-button">{middleButton}</span>
                </div>
            </div>
        </div>
    )
}