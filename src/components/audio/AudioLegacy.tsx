import { useRef, useState, useEffect } from "react"

export default function () {
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D>(null!)

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current!
        const context = canvas.getContext("2d")!

        context.fillStyle = "lightgray"
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.fillStyle = "red"
        context.strokeStyle = "white"

        setCanvasContext(context)
    }, [])

    return (
        <>
            <p>
                <audio ref={audioRef} controls
                    onSeeked={() => {
                        const audio = audioRef.current!
                        const canvas = canvasRef.current!

                        const inc = (canvas.width / audio.duration)

                        console.log(audio.buffered, audio.played)

                        for (let i = 0; i < audio.buffered.length; i++) {
                            const startX = audio.buffered.start(i) * inc;
                            const endX = audio.buffered.end(i) * inc;
                            const width = endX - startX;

                            canvasContext.fillRect(startX, 0, width, canvas.height);
                            canvasContext.rect(startX, 0, width, canvas.height);
                            //canvasContext.stroke();
                        }
                    }}>
                    <source
                        src="http://music.kapehh.net:8787/Rammstein/Auslander.flac"
                        type="audio/mpeg"
                    />
                </audio>
            </p>
            <p>
                <canvas
                    ref={canvasRef}
                    width="300"
                    height="20"
                > </canvas>
            </p>
        </>
    )
}