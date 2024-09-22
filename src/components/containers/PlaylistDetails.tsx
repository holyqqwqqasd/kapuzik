import Pause from '../images/pause'
import Play from '../images/play'
import { COLOR_BUTTONS } from '../../Constants.ts'
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
    const items = playlist.tracks.sort((a, b) => a.name > b.name ? 1 : -1).map((x, i) =>
        <div className={"track-item " + (state && i == state.position ? "active" : "")} key={i}>
            {state && i == state.position && state.playing
                ? <Pause
                    size={35}
                    color={COLOR_BUTTONS}
                    onClick={onPause}
                />
                : <Play
                    size={35}
                    color={COLOR_BUTTONS}
                    onClick={() => onPlay(i)}
                />}
            <span>{x.name}</span>
        </div>
    )

    const cover = playlist.cover ?? config.defaultCover ?? null

    return (
        <>
            <div className="card">
                <div className="playlist-details-component">
                    <div className="info">
                        {cover ? <img src={config.baseUrl + cover} /> : null}
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