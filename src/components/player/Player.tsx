import { useState } from 'react'
import { Button } from "keep-react";
import QueueComponent from '../audio/QueueComponent.tsx'

interface State {
  queue?: QueueTracks
}

export default function ({ queue }: State) {
  if (queue) {
    return (
      <>
        <QueueComponent
          key={queue.uniqId}
          tracks={queue.tracks}
        />
      </>
    )
  } else {
    return <></>
  }
}
