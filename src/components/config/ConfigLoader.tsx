import { useRef, useState } from "react"

interface State {
    onSave: (jsonConfig: string) => void
}

type LoadType = "json" | "file" | "url"

export default function ({ onSave }: State) {
    const [type, setType] = useState<LoadType>("file")
    const refText = useRef<HTMLTextAreaElement>(null)
    const refFile = useRef<HTMLInputElement>(null)
    const refUrl = useRef<HTMLInputElement>(null)

    return (
        <>
            <button onClick={() => setType("json")}>JSON</button>
            <button onClick={() => setType("file")}>FILE</button>
            <button onClick={() => setType("url")}>URL</button>
            <hr />
            {type == "json"
                ? <div>
                    <textarea ref={refText}></textarea>
                    <button onClick={() => onSave(refText.current!.value)}>Save</button>
                </div>
                : null}
            {type == "file"
                ? <div>
                    <input type="file" ref={refFile} />
                    <button onClick={() => {
                        let files = refFile.current!.files
                        if (!files) {
                            return
                        }

                        let reader = new FileReader()
                        reader.onload = function (event) {
                            let json = event.target!.result
                            if (!json || typeof (json) != "string") {
                                return
                            }

                            onSave(json)
                        };
                        reader.readAsText(files[0])
                    }}>Load</button>
                </div>
                : null}
            {type == "url"
                ? <div>
                    <input type="text" ref={refUrl} />
                    <button onClick={() => {
                        fetch(refUrl.current!.value)
                            .then(response => response.text())
                            .then(txt => onSave(txt))
                    }}>Load</button>
                </div>
                : null}
        </>
    )
}