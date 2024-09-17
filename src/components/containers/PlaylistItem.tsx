import "./PlaylistItem.css"

interface State {
    config: PlayerConfig
    playlist: Playlist
    playing: boolean
    onSelect: () => void
}

export default function ({ config, playlist, playing, onSelect }: State) {
    return (
        <div className="playlist-item-component" onClick={onSelect}>
            {playlist.cover ?
                <div className="image">
                    <img src={config.baseUrl + playlist.cover} />
                </div>
                : null}
            <div className="playlist-name">
                {playlist.name}
            </div>
        </div>
    )
}