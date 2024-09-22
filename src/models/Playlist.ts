interface Playlist {
    id: string
    name: string
    cover?: string | null
    tracks: Track[]
}