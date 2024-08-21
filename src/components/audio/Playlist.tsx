import AudioCard from './AudioCard.tsx'

interface State {
    tracks: string[]
    position: number
    onPositionChanged: (selected: number) => void
}

export default function (props: State) {
    const currentUrl = props.position >= 0 ? props.tracks[props.position] : undefined
    const list = props.tracks.map((x, i) =>
        <li key={i}><button onClick={() => props.onPositionChanged(i)}>Play</button> {x}</li>
    )

    return (
        <>
            <ul>
                {list}
            </ul>
            <AudioCard
                key={currentUrl}
                currentUrl={currentUrl}
                onNextTrack={() => {
                    const nextPosition = props.position + 1

                    if (nextPosition < props.tracks.length) {
                        props.onPositionChanged(nextPosition)
                    } else {
                        props.onPositionChanged(-1)
                    }
                }}
            />
        </>
    )
}
