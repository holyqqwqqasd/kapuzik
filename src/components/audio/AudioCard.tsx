import Pause from '../images/pause.tsx'
import Play from '../images/play.tsx'
import './AudioCard.css'

export default function() {
    return (
        <div>
            <Pause size={35} color="red" />
            <Play size={35} color="red" />
        </div>
    )
}