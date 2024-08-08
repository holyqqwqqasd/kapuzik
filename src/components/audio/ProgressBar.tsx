import './ProgressBar.css'

interface State {
    position: number
    duration: number
    selected?: (current: number) => void
}

export default function ({ position, duration, selected }: State) {
    const percent = duration > 0
        ? (position / duration) * 100
        : 0

    return (
        <div
            className="audio-progress-bar"
            onMouseDown={e => {
                const target = e.currentTarget
                const rect = target.getBoundingClientRect()

                if (selected) {
                    const x = e.clientX - rect.left
                    const percent = x / rect.width
                    selected(percent)
                }
            }} >
            <div className="background" />
            <div
                className="fill"
                style={{ width: `${percent}%` }} />
            <div
                className="seeker"
                style={{ left: `${percent}%` }} />
        </div>
    )
}