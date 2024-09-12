import "./PlaylistItem.css"

interface State {
    playlist: Playlist
    playing: boolean
    onSelect: () => void
}

export default function ({ playlist, playing, onSelect }: State) {
    return (
        <div className="playlist-item-component">
            <div className="image">
                <img src={playlist.cover} />
            </div>
            <div className="playlist-name">
                {playlist.name}
            </div>
            <button onClick={onSelect}>SELECT {playing ? "Y" : "N"}</button>
        </div>
    )
}