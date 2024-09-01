import Player from './components/player/Player'
import test_config from './models/test_config'

export default function () {
  return (
    <>
      <Player playlists={test_config} />
    </>
  )
}
