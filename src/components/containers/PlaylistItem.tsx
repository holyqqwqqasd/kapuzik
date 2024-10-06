import "./PlaylistItem.css"

interface State {
    config: PlayerConfig
    playlist: Playlist
    playing: boolean
    onSelect: () => void
}

export default function ({ config, playlist, playing, onSelect }: State) {
    const cover = playlist.cover ?? config.defaultCover ?? null

    return (
        <div
            className={"playlist-item-component" + (playing ? " active" : "")}
            onClick={onSelect}
        >
            {cover ?
                <div className="image">
                    <img src={config.baseUrl + cover} />
                </div>
                : null}
            <div className="playlist-name">
                {playlist.name}
            </div>
        </div>
    )
}