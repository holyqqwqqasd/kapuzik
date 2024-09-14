import Link from '../images/link'
import Pause from '../images/pause'
import Play from '../images/play'
import './PlaylistDetails.css'

interface PlayState {
    playing: boolean
    position: number
}

interface State {
    playlist: Playlist
    state: PlayState | null
    onPlay: (position: number) => void
    onPause: () => void
}

export default function ({ playlist, state, onPlay, onPause }: State) {
    const items = playlist.tracks.map((x, i) =>
        <div className="track-item" key={i}>
            {state && i == state.position && state.playing
                ? <Pause
                    size={35}
                    color="#fe6060"
                    onClick={onPause}
                />
                : <Play
                    size={35}
                    color="#fe6060"
                    onClick={() => onPlay(i)}
                />}
            <span style={{ color: state && i == state.position ? "red" : undefined }}>{x.name}</span>
        </div>
    )

    return (
        <>
            <div className="card" style={{
                background: `linear-gradient(180deg, ${playlist.color} 0%, black 60%)`
            }}>
                <div className="playlist-details-component">
                    <div className="info">
                        <img src={playlist.cover} />
                        <div className="title">{playlist.name}</div>
                    </div>
                    <div className="tracks">
                        {items}
                    </div>
                </div>
            </div>
        </>
    )
}