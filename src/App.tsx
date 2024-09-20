import { useState } from 'react'
import ConfigLoader from './components/config/ConfigLoader'
import Player from './components/player/Player'

// TODO: Сделать режим редактирования конфига, с возможностью его экспортирования

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
  localStorage.setItem('config', jsonConfig)
  return config
}

function clearConfig() {
  localStorage.removeItem('config')
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
