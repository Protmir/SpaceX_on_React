import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import YouTube from "react-youtube";
import useLaunches from "../useLaunches/useLaunches";
import Main from "../main/Main";

import './details.css'

const Details = props => {

    const [launch, setLaunch] = useState(null)

    const { getLaunch } = useLaunches()

    useEffect(() => {
        setLaunch(getLaunch(props.match.params.id))
    }, [getLaunch()])

    console.log(launch)

    if(!launch) return null

    return (
        <>
            <Main name={launch.name}/>
            <main className="details">
                <div className="container">
                    <div className="details-row">
                        <div className="details-image">
                            <img src={launch.links.patch.small} alt={launch.name}/>
                        </div>
                        <div className="details-content">
                            <p className="details-description">{launch.details}</p>
                        </div>
                    </div>
                    <YouTube className={'details-youtube'} videoId={launch.links.youtube_id}/>
                </div>
                <Link to={'/calendar'} className="button button-back">Go back</Link>
            </main>
        </>
    )
}

export default Details