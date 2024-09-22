import Pause from '../images/pause.tsx'
import Play from '../images/play.tsx'
import Next from '../images/next.tsx'
import Previous from '../images/previous.tsx'
import ProgressBar from './ProgressBar.tsx'
import { COLOR_BUTTONS } from '../../Constants.ts'
import './AudioCard.css'

interface State {
    config: PlayerConfig
    playlist: Playlist
    currentTrack: Track
    playing: boolean
    progress: number
    duration: number
    onPlay: () => void
    onPause: () => void
    onProgressSeeked: (x: number) => void
    onVolumeChanged: (x: number) => void
    onPrevious: () => void
    onNext: () => void
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
    config,
    playlist,
    currentTrack,
    playing,
    progress,
    duration,
    onPause,
    onPlay,
    onProgressSeeked,
    onVolumeChanged,
    onPrevious,
    onNext
}: State) {

    const middleButton = playing
        ? <Pause
            size="5vh"
            color={COLOR_BUTTONS}
            onClick={onPause}
        />
        : <Play
            size="5vh"
            color={COLOR_BUTTONS}
            onClick={onPlay}
        />

    const cover = currentTrack.cover ?? playlist.cover ?? config.defaultCover ?? null

    return (
        <div className="audio-container">
            <div className="audio-cover">
                {cover ? <img src={config.baseUrl + cover}></img> : null}
            </div>
            <div className="audio-info">
                <div>{currentTrack.name}</div>
                <div><strong>{currentTrack.artist}</strong></div>
            </div>
            <div className="audio-controls">
                <div className="audio-buttons">
                    <div className="audio-buttons-arrow">
                        <Previous
                            size="100%"
                            color="#599a70"
                            onClick={onPrevious} />
                    </div>
                    <div className="audio-buttons-center">
                        {middleButton}
                    </div>
                    <div className="audio-buttons-arrow">
                        <Next
                            size="100%"
                            color="#599a70"
                            onClick={onNext} />
                    </div>
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
                <div className="audio-volume">
                    <input type="range" min={0} max={100} defaultValue={100} onChange={e => {
                        const volume = e.target.valueAsNumber
                        onVolumeChanged(volume / 100)
                    }} />
                </div>
            </div>
        </div>
    )
}