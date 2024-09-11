import { useState, useRef } from 'react'
import AudioCard from '../audio/AudioCard.tsx'
import './Player.css'
import test_config from '../../models/test_config.ts'

export default function () {
  const audioRef = useRef<HTMLAudioElement>(null)

  // queue track part
  const [playlist, setPlaylist] = useState<Playlist | null>(null)
  const [position, setPosition] = useState(-1)
  const currentTrack = position >= 0 && playlist !== null
    ? playlist.tracks[position]
    : null

  // audio card part
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playing, setPlaying] = useState(false)

  const playList =
    test_config.map(x =>
      <div key={x.id}>
        {x.name}
        <button onClick={() => {
          if (playlist?.id == x.id) {
            return
          }

          setPosition(0)
          setPlaylist(x)
        }}>Play</button>
        <strong>{playlist?.id == x.id ? "PLAYING" : ""}</strong>
      </div>
    )
  const queueList = playlist !== null
    ? playlist.tracks.map((x, i) =>
      <li key={i}>
        <button onClick={() => setPosition(i)}>Play</button>
        <button onClick={() => navigator.clipboard.writeText(x.url)}>URL</button>
        <span style={{ color: i == position ? "red" : "black" }}>{x.name}</span>
      </li>
    )
    : null
  const onPlay = () => { audioRef.current!.play() }
  const onPause = () => { audioRef.current!.pause() }
  const onProgressSeeked = (x: number) => { audioRef.current!.currentTime = x }

  return (
    <>
      <div className="main-container">
        <div className="content">
          <div>
            {playList}
          </div>
          <div>
            <ul>
              {queueList}
            </ul>
          </div>
        </div>
        <div className="controls">
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

        {currentTrack == null
          ? null
          : <audio
            ref={audioRef}
            autoPlay={true}
            onTimeUpdate={e => {
              const audio = e.currentTarget
              const floored = Math.floor(audio.currentTime)

              setProgress(floored)
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
              if (playlist === null) {
                return
              }

              const nextPosition = position + 1

              if (nextPosition < playlist.tracks.length) {
                setPosition(nextPosition)
              } else {
                setPosition(-1)
              }
            }}
            src={currentTrack.url}
          />}
      </div>
    </>
  )
}
