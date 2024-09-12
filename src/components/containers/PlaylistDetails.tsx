
interface State {
    playlist: Playlist
    playing: boolean
    position: number
    onPlay: (position: number) => void
}

export default function ({ playlist, playing, position, onPlay }: State) {
    const playingIndex = playing ? position : -1
    const items = playlist.tracks.map((x, i) =>
        <li key={i}>
            <button onClick={() => onPlay(i)}>Play</button>
            <button onClick={() => navigator.clipboard.writeText(x.url)}>URL</button>
            <span style={{ color: i == playingIndex ? "red" : undefined }}>{x.name}</span>
        </li>
    )

    return (
        <>
            <div>
                <div>{playlist.name}. IS PLAYING: {playing ? "Y" : "N"}</div>
                <ul>
                    {items}
                </ul>
            </div>
        </>
    )
}