import { useState } from 'react'
import Playlist from './components/audio/Playlist.tsx'

const musics = [
  "http://music.kapehh.net:8787/Linkin%20Park/2023%20-%20Meteora%2020th/01%20-%20Lost.flac",
  "http://music.kapehh.net:8787/Linkin%20Park/2023%20-%20Meteora%2020th/02%20-%20Fighting%20Myself.flac"
]

const musics_2 = [
  "http://music.kapehh.net:8787/System%20Of%20A%20Down/System%20Of%20A%20Down%20-%20Lonely%20Day.flac",
  "http://music.kapehh.net:8787/System%20Of%20A%20Down/System%20Of%20A%20Down%20-%20Chop%20Suey%21.flac"
]

export default function () {
  const [switcher, setSwitcher] = useState(true)
  const [position, setPosition] = useState(-1)

  return (
    <>
      <button onClick={() => {
        setPosition(-1)
        setSwitcher(!switcher)
      }}>switch playlist</button>
      <Playlist
        position={position}
        tracks={switcher ? musics : musics_2}
        onPositionChanged={pos => setPosition(pos)}
      />
    </>
  )
}
