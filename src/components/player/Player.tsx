import { useState } from 'react'
import QueueComponent from '../audio/QueueComponent.tsx'

interface State {
  playlists: Playlist[]
}

export default function ({ playlists }: State) {
  const [queue, setQueue] = useState<QueueTracks | undefined>()
  const prevQueue: QueueTracks = queue ?? { uniqId: 0, tracks: [] }
  const selectPlaylistComponent =
    <>
      {playlists.map(x =>
        <div key={x.id}>
          {x.name}
          <button onClick={() => setQueue({
            uniqId: prevQueue.uniqId + 1,
            tracks: x.tracks
          })}>Play</button>
          <button onClick={() => setQueue({
            uniqId: prevQueue.uniqId,
            tracks: [...prevQueue.tracks, ...x.tracks]
          })}>Add to queue</button>
        </div>
      )}
    </>

  if (queue) {
    return (
      <>
        {selectPlaylistComponent}
        <QueueComponent
          key={queue.uniqId}
          tracks={queue.tracks}
        />
      </>
    )
  } else {
    return (
      <>
        {selectPlaylistComponent}
      </>
    )
  }
}
