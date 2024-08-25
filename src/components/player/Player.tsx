import { useState } from 'react'
import Queuelist from '../audio/Queuelist.tsx'

interface State {
    playlist: Playlist
}

export default function ({ playlist }: State) {
  const [position, setPosition] = useState(-1)

  return (
    <>
      <Queuelist
        key={playlist.id}
        position={position}
        tracks={playlist.tracks}
        onPositionChanged={pos => setPosition(pos)}
      />
    </>
  )
}
