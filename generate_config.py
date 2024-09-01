import sys

f = open(sys.argv[1], "r")

uniq_id = 0

def get_new_id():
    global uniq_id
    uniq_id += 1
    return uniq_id

playlists = {}

for line in f.readlines():
    raw_playlist, raw_song = line.split("|")
    playlist = raw_playlist[2:]
    song = raw_song[2:].strip()

    if playlist in playlists:
        playlists[playlist].append(
            {
                "id": get_new_id(),
                "name": song,
                "url": "http://music.kapehh.net:8787/" + song
            })
    else:
        playlists[playlist] = [
            {
                "id": get_new_id(),
                "name": song,
                "url": "http://music.kapehh.net:8787/" + song
            }
        ]

result = []

for p in playlists:
    result.append(
        {
            "id": get_new_id(),
            "name": p,
            "tracks": playlists[p]
        }
    )

print("const data: Playlist[] =")
print(result)
print("export default data")