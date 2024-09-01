import { useState } from 'react'
import QueueComponent from '../audio/QueueComponent.tsx'

interface State {
  playlists: Playlist[]
}

export default function ({ playlists }: State) {
  const [queue, setQueue] = useState<QueueTracks | undefined>()

  const selectPlaylistComponent =
    <select onChange={e => {
      const id = parseInt(e.target.value)
      const playlist = playlists.find(x => x.id == id)

      if (playlist) {
        const prevId = queue?.uniqId ?? 0
        setQueue({
          uniqId: prevId + 1,
          tracks: playlist?.tracks
        })
      }
    }}>
      {playlists.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}
    </select>

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
        PLZ SELECT PLAYLISTO
      </>
    )
  }
}
