import os
import json

BASE_URL = "http://music.kapehh.net:8787/"

path_to_music = "/home/karen/Downloads/test_for_script/"

uniq_id = 0
def get_new_id():
    global uniq_id
    uniq_id += 1
    return uniq_id

def gen_track(file_name):
    splits = file_name.split(".")[0].split("-")

    return {
        "id": get_new_id(),
        "url": (relative_path + "/" + file_name),
        "name": splits[1].strip() if len(splits) > 1 else splits[0].strip(),
        "artist": splits[0].strip() if len(splits) > 1 else None
    }

result = []

for root, dirs, files in os.walk(path_to_music):
    if files:
        cover = next((x for x in files if x.endswith((".png", ".jpg", ".jpeg"))), None)
        tracks = [x for x in files if x.endswith((".flac", ".mp3"))]
        if tracks:
            relative_path = root.removeprefix(path_to_music)
            result.append(
                {
                    "id": get_new_id(),
                    "name": relative_path,
                    "cover": cover,
                    "tracks": [gen_track(x) for x in tracks]
                }
            )

print(json.dumps(result, indent=4))