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
    const items = playlist.tracks.sort((a, b) => a.name > b.name ? 1 : -1).map((x, i) => {
        const thisPlaying = state && i == state.position && state.playing

        return (
            <div
                key={i}
                className={"track-item " + (state && i == state.position ? "active" : "")}
                onClick={() => thisPlaying ? onPause() : onPlay(i)}
            >
                {thisPlaying
                    ? <Pause
                        size={35}
                        color={COLOR_BUTTONS}
                    />
                    : <Play
                        size={35}
                        color={COLOR_BUTTONS}
                    />}
                <span>{x.name}</span>
            </div>
        )
    })

    const cover = playlist.cover ?? config.defaultCover ?? null

    return (
        <>
            <div className="playlist-details-component">
                <div className="info">
                    {cover ? <img src={config.baseUrl + cover} /> : null}
                    <div className="title">{playlist.name}</div>
                </div>
                <div className="tracks">
                    {items}
                </div>
            </div>
        </>
    )
}