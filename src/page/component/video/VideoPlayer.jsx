import React, {useRef, useEffect} from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({src}) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    // Khởi tạo player một lần khi mount
    useEffect(() => {
        if (videoRef.current && !playerRef.current) {
            playerRef.current = videojs(videoRef.current, {
                controls: true,
                sources: src ? [{src, type: 'video/mp4'}] : [],
                aspectRatio: '16:9',
                fluid: true,
            });
        }
        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, []);

    // Khi src thay đổi, cập nhật nguồn video qua API của videojs
    useEffect(() => {
        if (playerRef.current && src) {
            playerRef.current.src([{src, type: 'video/mp4'}]);
            playerRef.current.play();
        } else if (playerRef.current && !src) {
            playerRef.current.pause();
            playerRef.current.src([]);
        }
    }, [src]);

    if (!src) return null;

    return (
        <video
            ref={videoRef}
            className="video-js vjs-default-skin"
        />
    );
};
export default VideoPlayer;
