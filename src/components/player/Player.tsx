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
  const [openedPlaylist, setOpenedPlaylist] = useState<Playlist | null>(null)
  const [playingPlaylist, setPlaylist] = useState<Playlist | null>(null)
  const [position, setPosition] = useState(-1)
  const currentTrack = position >= 0 && playingPlaylist
    ? playingPlaylist.tracks[position]
    : null
  const openedPlaylistIsPlaying =
    openedPlaylist && playingPlaylist && openedPlaylist.id == playingPlaylist.id

  // audio card part
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playing, setPlaying] = useState(false)

  const playList = config.playlists.sort((a, b) => a.name > b.name ? 1 : -1).map(x =>
    <PlaylistItem
      key={x.id}
      config={config}
      playlist={x}
      playing={playingPlaylist?.id == x.id}
      onSelect={() => {
        if (openedPlaylist?.id == x.id) {
          return
        }

        setOpenedPlaylist(x)
      }} />
  )
  const onPlay = () => { audioRef.current!.play() }
  const onPause = () => { audioRef.current!.pause() }
  const onProgressSeeked = (x: number) => { audioRef.current!.currentTime = x }
  const onVolumeChanged = (x: number) => { audioRef.current!.volume = x }
  const onPrevious = () => {
    if (!playingPlaylist) {
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
    if (!playingPlaylist) {
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
  navigator.mediaSession.setActionHandler('play', () => {
    if (currentTrack) {
      navigator.mediaSession.playbackState = 'playing'
      onPlay()
    }
  })
  navigator.mediaSession.setActionHandler('pause', () => {
    if (currentTrack) {
      navigator.mediaSession.playbackState = 'paused'
      onPause()
    }
  })

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
      })
    } else {
      document.title = 'kapuzik'
      navigator.mediaSession.metadata = null
      navigator.mediaSession.playbackState = 'none'
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
            <button className="delete-config" onClick={clearConfig}>RESET</button>
          </div>
          <div className="details">
            {openedPlaylist
              ? <div className="card">
                  <PlaylistDetails
                    config={config}
                    playlist={openedPlaylist}
                    state={openedPlaylistIsPlaying ? { position, playing } : null}
                    onPlay={(newPosition) => {
                      if (newPosition == position && openedPlaylistIsPlaying) {
                        onPlay()
                        return
                      }

                      setPosition(newPosition)
                      setPlaylist(openedPlaylist)
                    }}
                    onPause={onPause} />
                </div>
              : null}
          </div>
        </div>
        <div className="controls">
          {currentTrack
            ? <AudioCard
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
            />
            : null}
        </div>

        {currentTrack
          ? <audio
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
          />
          : null}
      </div>
    </>
  )
}
