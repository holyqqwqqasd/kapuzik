import { useState, useRef } from 'react'
import AudioCard from '../audio/AudioCard.tsx'
import './Player.css'
import test_config from '../../models/test_config.ts'
import PlaylistItem from '../containers/PlaylistItem.tsx'
import PlaylistDetails from '../containers/PlaylistDetails.tsx'

export default function () {
  const audioRef = useRef<HTMLAudioElement>(null)

  // playlist part
  const [playlistView, setPlaylistView] = useState<Playlist | null>(null)
  const [playingPlaylist, setPlaylist] = useState<Playlist | null>(null)
  const [position, setPosition] = useState(-1)
  const currentTrack = position >= 0 && playingPlaylist !== null
    ? playingPlaylist.tracks[position]
    : null

  // audio card part
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playing, setPlaying] = useState(false)

  const playList =
    test_config.playlists.map(x =>
      <PlaylistItem
        key={x.id}
        config={test_config}
        playlist={x}
        playing={playingPlaylist?.id == x.id}
        onSelect={() => {
          if (playlistView?.id == x.id) {
            return
          }

          setPlaylistView(x)
        }} />
    )
  const onPlay = () => { audioRef.current!.play() }
  const onPause = () => { audioRef.current!.pause() }
  const onProgressSeeked = (x: number) => { audioRef.current!.currentTime = x }

  return (
    <>
      <div className="main-container">
        <div className="content">
          <div className="playlists">
            <div className="card">
              {playList}
            </div>
          </div>
          <div className="details">
            {playlistView !== null
              ? <PlaylistDetails
                config={test_config}
                playlist={playlistView}
                state={playlistView.id == playingPlaylist?.id
                  ? { position, playing }
                  : null}
                onPlay={(newPosition) => {
                  if (newPosition == position) {
                    onPlay()
                    return
                  }

                  setPosition(newPosition)
                  setPlaylist(playlistView)
                }}
                onPause={onPause} />
              : null}
          </div>
        </div>
        <div className="controls">
          {currentTrack == null
            ? null
            : <AudioCard
              config={test_config}
              currentTrack={currentTrack}
              playlist={playingPlaylist!}
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
              if (playingPlaylist === null) {
                return
              }

              const nextPosition = position + 1

              if (nextPosition < playingPlaylist.tracks.length) {
                setPosition(nextPosition)
              } else {
                setPosition(-1)
              }
            }}
            src={test_config.baseUrl + currentTrack.url}
          />}
      </div>
    </>
  )
}
