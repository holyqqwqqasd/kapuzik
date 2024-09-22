import { useState } from 'react'
import ConfigLoader from './components/config/ConfigLoader'
import Player from './components/player/Player'

// TODO: Сделать режим редактирования конфига, с возможностью его экспортирования

function fillIds(config: PlayerConfig) {
  var id = 0

  for (var i = 0; i < config.playlists.length; i++) {
    const playlist = config.playlists[i]
    playlist.id = (++id).toString()

    for (var k = 0; k < playlist.tracks.length; k++) {
      const track = playlist.tracks[k]
      track.id = (++id).toString()
    }
  }
}

function loadConfig(): PlayerConfig | null {
  const config = localStorage.getItem('config')

  if (config) {
    const playerConfig: PlayerConfig = JSON.parse(config)
    return playerConfig
  }

  console.warn('Config not found!')
  return null
}

function saveConfig(jsonConfig: string): PlayerConfig {
  const config = JSON.parse(jsonConfig)
  fillIds(config)
  localStorage.setItem('config', JSON.stringify(config))
  location.hash = ""
  return config
}

function clearConfig() {
  localStorage.removeItem('config')
  location.hash = ""
  location.reload();
}

export default function () {
  const [config, setConfig] = useState(loadConfig())

  if (config) {
    return (
      <>
        <Player
          config={config}
          clearConfig={clearConfig} />
      </>
    )
  }

  return (
    <>
      <ConfigLoader onSave={(jsonConfig) => {
        try {
          const newConfig = saveConfig(jsonConfig)
          setConfig(newConfig)
        }
        catch {
        }
      }} />
    </>
  )
}
