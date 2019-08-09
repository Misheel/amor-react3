import React, { useState, useEffect } from 'react';

function Banner() {

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [link, setLink] = useState('');
    const [linkName, setLinkName] = useState('');
    const [video, setVideo] = useState('');

    function YouTubeGetID(url) {
        var ID = '';
        url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if (url[2] !== undefined) {
            ID = url[2].split(/[^0-9a-z_\-]/i);
            ID = ID[0];
        }
        else {
            ID = url;
        }
        return ID;
    }

    function fetchStaticText(name, setText) {
        fetch('/api/staticText/readByName/' + name)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setText(data.text);
            });
    }

    useEffect(() => {
        fetchStaticText('heroTitle', setName);
        fetchStaticText('heroDesc', setDesc);
        fetchStaticText('heroLink', setLink);
        fetchStaticText('heroLinkName', setLinkName);
        fetchStaticText('heroVideo', setVideo);

    }, [])

    return (
        <section className="banner_part">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-lg-7">
                        <div className="banner_text text-center">
                            <div className="banner_text_iner">
                                <h1>{name}</h1>
                                <p>{desc}</p>
                                <a href={link} className="btn_2">{linkName}</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7" >
                        <div className="banner_video" style={{width: '100%'}}>
                            {
                                video &&
                                <div className="banner_video_iner" style={{position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', width: '100%'}}>
                                    <iframe style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} width="560" height="315" src={`https://www.youtube.com/embed/${YouTubeGetID(video)}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;
