import { useState, useRef } from 'react'
import AudioCard from '../audio/AudioCard.tsx'
import './Player.css'
import test_config from '../../models/test_config.ts'

type ActiveItem = "playlists" | "queue"

export default function () {
  const audioRef = useRef<HTMLAudioElement>(null)

  // main part
  const [activeTab, setActiveTab] = useState<ActiveItem>("playlists")

  // queue track part
  const [tracks, setTracks] = useState<Track[]>([])
  const [position, setPosition] = useState(-1)
  const currentTrack = position >= 0 ? tracks[position] : null

  // audio card part
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playing, setPlaying] = useState(false)

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
  const onPlay = () => { audioRef.current!.play() }
  const onPause = () => { audioRef.current!.pause() }
  const onProgressSeeked = (x: number) => { audioRef.current!.currentTime = x }

  return (
    <>
      <button onClick={() => setActiveTab("playlists")}>Playlists</button>
      <button onClick={() => setActiveTab("queue")}>Queue</button>

      <hr />

      {activeTab == "playlists" ? playList : null}
      {activeTab == "queue"
        ? <div className="main-player queue-list">
          {queueList}
          {currentTrack == null
            ? null
            : <AudioCard
              currentTrack={currentTrack}
              progress={progress}
              playing={playing}
              duration={duration}
              onPlay={onPlay}
              onPause={onPause}
              onProgressSeeked={onProgressSeeked}
            />}
        </div>
        : null}

      {currentTrack == null
        ? null
        : <audio
          ref={audioRef}
          autoPlay={true}
          onTimeUpdate={e => {
            const audio = e.currentTarget

            setProgress(audio.currentTime)
          }}
          onPause={_ => {
            setPlaying(false)
          }}
          onPlay={_ => {
            setPlaying(true)
          }}
          onLoadedData={e => {
            const audio = e.currentTarget

            setDuration(audio.duration)
          }}
          onEnded={_ => {
            const nextPosition = position + 1

            if (nextPosition < tracks.length) {
              setPosition(nextPosition)
            } else {
              setPosition(-1)
            }
          }}
          src={currentTrack.url}
        />}
    </>
  )
}
