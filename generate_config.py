import os
import json

BASE_URL = "http://music.kapehh.net:8787/"

path_to_music = "/media/MUSIC/"

def remove_prefix(text, prefix):
    if text.startswith(prefix):
        return text[len(prefix):]
    return text

def gen_track(relative_path, file_name):
    return {
        "url": (relative_path + "/" + file_name),
        "name": file_name,
        "artist": relative_path
    }

playlists = []
for root, dirs, files in os.walk(path_to_music):
    if files:
        cover = next((x for x in files if x.endswith((".png", ".jpg", ".jpeg"))), None)
        tracks = [x for x in files if x.endswith((".flac", ".mp3"))]
        tracks.sort()
        if tracks:
            relative_path = remove_prefix(root, path_to_music)
            playlists.append(
                {
                    "name": relative_path,
                    "cover": relative_path + "/" + cover if cover is not None else None,
                    "tracks": [gen_track(relative_path, x) for x in tracks]
                }
            )

result = {
    "baseUrl": BASE_URL,
    "defaultCover": "default_cover.jpg",
    "playlists": playlists
}
print(json.dumps(result, indent=4))