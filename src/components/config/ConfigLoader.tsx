import { useRef } from "react"

interface State {
    onSave: (jsonConfig: string) => void
}

export default function({ onSave }: State) {
    const refText = useRef<HTMLTextAreaElement>(null)

    return (
        <>
            <textarea ref={refText}></textarea>
            <button onClick={() => onSave(refText.current!.value)}>Save</button>
        </>
    )
}