import Pause from '../images/pause'
import Play from '../images/play'
import './PlaylistDetails.css'

interface PlayState {
    playing: boolean
    position: number
}

interface State {
    config: PlayerConfig
    playlist: Playlist
    state: PlayState | null
    onPlay: (position: number) => void
    onPause: () => void
}

export default function ({ config, playlist, state, onPlay, onPause }: State) {
    const items = playlist.tracks.map((x, i) =>
        <div className={"track-item " + (state && i == state.position ? "active" : "")} key={i}>
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
            <span>{x.name}</span>
        </div>
    )

    return (
        <>
            <div className="card">
                <div className="playlist-details-component">
                    <div className="info">
                        {playlist.cover ? <img src={config.baseUrl + playlist.cover} /> : null}
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