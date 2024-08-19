import { useState } from 'react'
import AudioCard from './AudioCard.tsx'

const musics = [
    "http://music.kapehh.net:8787/Linkin%20Park/2023%20-%20Meteora%2020th/01%20-%20Lost.flac",
    "http://music.kapehh.net:8787/Linkin%20Park/2023%20-%20Meteora%2020th/02%20-%20Fighting%20Myself.flac"
]

export default function () {
    const [position, setPosition] = useState(0)

    return (
        <>
            <button onClick={() => setPosition(0)}>1</button>
            <button onClick={() => setPosition(1)}>2</button>
            <AudioCard
                currentUrl={position >= 0 ? musics[position] : undefined}
                onNextTrack={() => {
                    const nextPosition = position + 1

                    if (nextPosition < musics.length) {
                        setPosition(nextPosition)
                    } else {
                        setPosition(-1)
                    }
                }}
            />
        </>
    )
}
