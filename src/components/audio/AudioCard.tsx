import play from '../../assets/play.svg'
import pause from '../../assets/pause.svg'
import next from '../../assets/next.svg'
import previous from '../../assets/previous.svg'
import muted from '../../assets/muted.svg'
import volume from '../../assets/volume.svg'
import volume_small from '../../assets/volume-small.svg'
import volume_loud from '../../assets/volume-loud.svg'

export default function () {
    return (
        <div>
            <img
                width={35}
                height={35}
                src={volume}
            />
            <img
                width={35}
                height={35}
                src={volume_small}
            />
            <img
                width={35}
                height={35}
                src={volume_loud}
            />
            <img
                width={35}
                height={35}
                src={muted}
            />
            <img
                width={35}
                height={35}
                src={previous}
            />
            <img
                width={35}
                height={35}
                src={play}
            />
            <img
                width={35}
                height={35}
                src={pause}
            />
            <img
                width={35}
                height={35}
                src={next}
            />
        </div>
    )
}