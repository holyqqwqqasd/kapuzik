import { useState } from 'react'
import QueueComponent from '../audio/QueueComponent.tsx'

interface State {
    playlist: Playlist
}

export default function ({ playlist }: State) {
  const [queue, setQueue] = useState<QueueTracks>({
    uniqId: 1,
    tracks: playlist.tracks
  })

  return (
    <>
      <button onClick={() => {
        setQueue({
          uniqId: queue.uniqId + 1,
          tracks: playlist.tracks
        })
      }}>Reset</button>
      <button onClick={() => {
        setQueue({
          uniqId: queue.uniqId,
          tracks: [...queue.tracks, ...queue.tracks]
        })
      }}>Add</button>
      <QueueComponent
        key={queue.uniqId}
        tracks={queue.tracks}
      />
    </>
  )
}
