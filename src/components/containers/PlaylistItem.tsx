interface State {
    playlist: Playlist
    playing: boolean
    onPlay: () => void
}

export default function ({ playlist, playing, onPlay }: State) {
    return (
        <div>
            IMG: {playlist.cover}, {playlist.name} {playing ? "ON" : "OFF"}
            <button onClick={onPlay}>GOOOO</button>
        </div>
    )
}