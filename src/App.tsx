import { useState } from 'react'
import QueueComponent from './components/audio/QueueComponent'
import Player from './components/player/Player'

const defaultPlayer: Playlist = {
  id: 1,
  tracks: [
    {
      id: 1,
      text: "Lost",
      url: "http://music.kapehh.net:8787/Linkin%20Park/2023%20-%20Meteora%2020th/01%20-%20Lost.flac"
    },
    {
      id: 2,
      text: "Fighting",
      url: "http://music.kapehh.net:8787/Linkin%20Park/2023%20-%20Meteora%2020th/02%20-%20Fighting%20Myself.flac"
    },
    {
      id: 3,
      text: "tatu about",
      url: "http://music.kapehh.net:8787/Other/t.A.T.u.%20-%20All%20About%20Us.mp3"
    },
    {
      id: 4,
      text: "Lonely",
      url: "http://music.kapehh.net:8787/System%20Of%20A%20Down/System%20Of%20A%20Down%20-%20Lonely%20Day.flac"
    },
    {
      id: 5,
      text: "Chop",
      url: "http://music.kapehh.net:8787/System%20Of%20A%20Down/System%20Of%20A%20Down%20-%20Chop%20Suey%21.flac"
    },
  ]
}

export default function () {
  return (
    <>
      <Player playlist={defaultPlayer} />
    </>
  )
}
