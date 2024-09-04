import { useState } from 'react'
import Player from './components/player/Player'
import { Button, TabContent, TabItem, TabList, Tabs } from 'keep-react'
import test_config from './models/test_config'
import './index.css'

export default function () {
  const [activeTab, setActiveTab] = useState<number>(1)
  const [queue, setQueue] = useState<QueueTracks | undefined>()
  const prevQueue: QueueTracks = queue ?? { uniqId: 0, tracks: [] }

  return (
    <>
      <div className="p-4">
        <Tabs variant="fill" defaultActive="queue">
          <TabList className="justify-center">
            <TabItem value="playlists">Playlists</TabItem>
            <TabItem value="queue">Queue</TabItem>
          </TabList>
          <TabContent value="playlists">
            {/* <div className="flex justify-center"> */}
            {test_config.map(x =>
              <div key={x.id}>
                {x.name}
                <Button onClick={() => {
                  setActiveTab(1)
                  setQueue({
                    uniqId: prevQueue.uniqId + 1,
                    tracks: x.tracks
                  })
                }}>Play</Button>
                <Button onClick={() => {
                  setActiveTab(1)
                  setQueue({
                    uniqId: prevQueue.uniqId,
                    tracks: [...prevQueue.tracks, ...x.tracks]
                  })
                }}>Add to queue</Button>
              </div>
            )}
            {/* </div> */}
          </TabContent>
          <TabContent value="queue">
            {/* <div className="flex justify-center"> */}
            <Player queue={queue} />
            {/* </div> */}
          </TabContent>
        </Tabs>
      </div>
    </>
  )
}
