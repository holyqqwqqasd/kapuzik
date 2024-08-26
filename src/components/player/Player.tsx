import QueueComponent from '../audio/QueueComponent.tsx'

interface State {
    playlist: Playlist
}

export default function ({ playlist }: State) {

  return (
    <>
      <QueueComponent
        key={playlist.id}
        tracks={playlist.tracks}
      />
    </>
  )
}
