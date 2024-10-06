import { useState, useRef, useEffect } from 'react'
import AudioCard from '../audio/AudioCard.tsx'
import './Player.css'
import PlaylistItem from '../containers/PlaylistItem.tsx'
import PlaylistDetails from '../containers/PlaylistDetails.tsx'

interface State {
  config: PlayerConfig
  clearConfig: () => void
}

export default function ({ config, clearConfig }: State) {
  const audioRef = useRef<HTMLAudioElement>(null)

  // playlist part
  const [playlistView, setPlaylistView] = useState<Playlist | null>(null)
  const [playingPlaylist, setPlaylist] = useState<Playlist | null>(null)
  const [position, setPosition] = useState(-1)
  const currentTrack = position >= 0 && playingPlaylist !== null
    ? playingPlaylist.tracks[position]
    : null
  const openedPlaylistIsPlaying =
    playlistView && playingPlaylist && playlistView.id == playingPlaylist.id

  // audio card part
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playing, setPlaying] = useState(false)

  const playList = config.playlists.sort((a, b) => a.name > b.name ? 1 : -1).map(x =>
    <PlaylistItem
      key={x.id}
      config={config}
      playlist={x}
      playing={playing && playingPlaylist?.id == x.id}
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
  const onVolumeChanged = (x: number) => { audioRef.current!.volume = x }
  const onPrevious = () => {
    if (playingPlaylist == null) {
      return
    }

    const nextPosition = position - 1

    if (nextPosition >= 0) {
      setPosition(nextPosition)
    } else {
      setPosition(-1)
      setPlaylist(null)
    }
  }
  const onNext = () => {
    if (playingPlaylist == null) {
      return
    }

    const nextPosition = position + 1

    if (nextPosition < playingPlaylist.tracks.length) {
      setPosition(nextPosition)
    } else {
      setPosition(-1)
      setPlaylist(null)
    }
  }

  navigator.mediaSession.setActionHandler('nexttrack', onNext)
  navigator.mediaSession.setActionHandler('previoustrack', onPrevious)

  useEffect(() => {
    if (currentTrack) {
      const cover = playingPlaylist?.cover ?? config.defaultCover
      document.title = `kapuzik | ${currentTrack.name}`
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.name,
        artist: currentTrack.artist,
        album: playingPlaylist?.name,
        artwork: [
          {
            src: config.baseUrl + cover,
          },
        ],
      });
    } else {
      document.title = 'kapuzik'
      navigator.mediaSession.metadata = null
    }
  }, [currentTrack?.id])

  return (
    <>
      <div className="main-container">
        <div className="content">
          <div className="playlists">
            <div className="card">
              {playList}
            </div>
            <button className="delete-config" onClick={clearConfig}>DELETE CONFIG</button>
          </div>
          <div className="details">
            <div className="card">
              {playlistView !== null
                ? <PlaylistDetails
                  config={config}
                  playlist={playlistView}
                  state={openedPlaylistIsPlaying ? { position, playing } : null}
                  onPlay={(newPosition) => {
                    if (newPosition == position && openedPlaylistIsPlaying) {
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
        </div>
        <div className="controls">
          {currentTrack == null
            ? null
            : <AudioCard
              config={config}
              currentTrack={currentTrack}
              playlist={playingPlaylist!}
              progress={progress}
              playing={playing}
              duration={duration}
              onPlay={onPlay}
              onPause={onPause}
              onProgressSeeked={onProgressSeeked}
              onVolumeChanged={onVolumeChanged}
              onPrevious={onPrevious}
              onNext={onNext}
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
            onEnded={onNext}
            src={config.baseUrl + currentTrack.url}
          />}
      </div>
    </>
  )
}
