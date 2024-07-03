import { useState } from "react"
import './Test.css'

export default function () {
    const [n, setN] = useState(0);

    return (
        <div className="slidecontainer">
            <input type="range" min="1" max="100" value={n} className="slider" onChange={(e) => setN(parseInt(e.target.value))} />
            <p>Value: <span>{n}</span></p>
        </div>
    );
}