import './PlaylistDetails.css'

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
            <div className="card" style={{
                background: `linear-gradient(180deg, ${playlist.color} 0%, black 60%)`
            }}>
                <div className="playlist-details-component">
                    <div className="info">
                        <img src={playlist.cover} />
                        <div className="title">{playlist.name}</div>
                    </div>
                    <div className="tracks">
                        <ul>
                            {items}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}