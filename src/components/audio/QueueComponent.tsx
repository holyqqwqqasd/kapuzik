import { useState } from 'react'
import AudioCard from './AudioCard.tsx'

interface State {
    tracks: Track[]
}

export default function (props: State) {
    const [position, setPosition] = useState(0)
    const currentTrack = position >= 0 ? props.tracks[position] : undefined
    const list = props.tracks.map((x, i) =>
        <li key={i}>
            <button onClick={() => setPosition(i)}>Play</button>
            <span style={{ color: i == position ? "red" : "black" }}>{x.name}</span>
        </li>
    )

    return (
        <>
            <ul>
                {list}
            </ul>
            <AudioCard
                key={currentTrack?.id}
                currentTrack={currentTrack}
                onNextTrack={() => {
                    const nextPosition = position + 1

                    if (nextPosition < props.tracks.length) {
                        setPosition(nextPosition)
                    } else {
                        setPosition(-1)
                    }
                }}
            />
        </>
    )
}
