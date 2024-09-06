import { useState } from 'react'
import AudioCard from '../audio/AudioCard.tsx'
import './Player.css'
import test_config from '../../models/test_config.ts'

type ActiveItem = "playlists" | "queue"

export default function () {
  const [activeTab, setActiveTab] = useState<ActiveItem>("playlists")
  const [tracks, setTracks] = useState<Track[]>([])
  const [position, setPosition] = useState(-1)
  const currentTrack = position >= 0 ? tracks[position] : null

  const playList =
    test_config.map(x =>
      <div key={x.id}>
        {x.name}
        <button onClick={() => {
          setPosition(0)
          setTracks(x.tracks)
          setActiveTab("queue")
        }}>Play</button>
        <button onClick={() => {
          setTracks([...tracks, ...x.tracks])
        }}>Add to queue</button>
      </div>
    )
  const queueList =
    tracks.map((x, i) =>
      <li key={i}>
        <button onClick={() => setPosition(i)}>Play</button>
        <button onClick={() => navigator.clipboard.writeText(x.url)}>URL</button>
        <span style={{ color: i == position ? "red" : "black" }}>{x.name}</span>
      </li>
    )

  return (
    <>
      <button onClick={() => setActiveTab("playlists")}>Playlists</button>
      <button onClick={() => setActiveTab("queue")}>Queue</button>

      {activeTab == "playlists" ? playList : null}

      <div className="main-player queue-list">
        {activeTab == "queue" ? queueList : null}
      </div>

      {currentTrack == null
        ? null
        : <AudioCard
          key={currentTrack.id}
          currentTrack={currentTrack}
          onNextTrack={() => {
            const nextPosition = position + 1

            if (nextPosition < tracks.length) {
              setPosition(nextPosition)
            } else {
              setPosition(-1)
            }
          }}
        />}
    </>
  )
}
