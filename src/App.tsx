import { useState } from 'react'
import ConfigLoader from './components/config/ConfigLoader'
import Player from './components/player/Player'

// TODO: Сделать режим редактирования конфига, с возможностью его экспортирования

function loadConfig(): PlayerConfig | null {
  const config = localStorage.getItem('config')

  if (config) {
    const playerConfig: PlayerConfig = JSON.parse(config)
    return playerConfig
  } else {
    console.warn('Config not found!')
    return null
  }
}

function saveConfig(jsonConfig: string): PlayerConfig {
  localStorage.setItem('config', jsonConfig)
  return JSON.parse(jsonConfig)
}

export default function () {
  const [config, setConfig] = useState(loadConfig())

  if (config) {
    return (
      <>
        <Player config={config} />
      </>
    )
  }

  return (
    <>
      <ConfigLoader onSave={(jsonConfig) => {
        const newConfig = saveConfig(jsonConfig)
        setConfig(newConfig)
      }} />
    </>
  )
}
