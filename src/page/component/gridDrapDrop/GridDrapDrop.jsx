import React, {useEffect, useRef, useState} from "react";
import Hls from "hls.js";

const initialItem = [
    {id: 1, content: 'Item 1', src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'},
    {id: 2, content: 'Item 2', src:  'https://live-hls-abr-cdn.livepush.io/live/bigbuckbunnyclip/index.m3u8'},
];

function HlsVideoPlayer({ src }) {
    const videoRef = useRef(null);

    useEffect(() => {
        let hls;
        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(videoRef.current);
        } else if (videoRef.current && videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = src;
        }
        return () => {
            if (hls) hls.destroy();
        };
    }, [src]);

    return (
        <video
            ref={videoRef}
            controls
            autoPlay
            style={{ width: 320, height: 180, background: "#000" }}
        />
    );
}


function GridDrapDrop() {
    const [items, setItems] = useState(initialItem);
    const [dragIndex, setDragIndex] = useState(null);

    /**
     * Sự kiện này được gọi khi bắt đầu kéo thả phần tử.
     * @param index
     */
    const onDragStart = (index) => setDragIndex(index);

    /**
     * Sự kiện này được gọi khi phần tử đang được kéo thả qua một vùng có thể thả.
     * @param e
     * @returns {*}
     */
    const onDragOver = (e) => {
        console.log('Dragging over index:', dragIndex);
        e.preventDefault()
    };

    /**
     * Sự kiện này được gọi khi phần tử được thả vào một vùng có thể thả.
     * @param index
     */
    const onDrop = (index) => {
        if (dragIndex === null || dragIndex === index) return;
        const newItems = [...items];
        const [removed] = newItems.splice(dragIndex, 1);
        newItems.splice(index, 0, removed);

        setItems(newItems);
        setDragIndex(null);
    }

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr',
            gap: 16,
            width: 900
        }}>
            {items.map((item, idx) => (
                <div
                    key={idx}
                    draggable // cho phép phần tử có thể được kéo thả bằng chuột.
                    onDragStart={() => onDragStart(idx)} // sự kiện này được gọi khi bắt đầu kéo thả phần tử.
                    onDragOver={onDragOver} // sự kiện này được gọi khi phần tử đang được kéo thả qua một vùng có thể thả.
                    onDrop={() => onDrop(idx)} // sự kiện này được gọi khi phần tử được thả vào một vùng có thể thả.
                    style={{
                        padding: 24,
                        background: "#e0e7ff",
                        border: "1px solid #6366f1",
                        borderRadius: 8,
                        textAlign: "center",
                        fontWeight: "bold",
                        cursor: "grab",
                        boxShadow: dragIndex === idx ? "0 8px 24px rgba(0,0,0,0.2)" : "none",
                        opacity: dragIndex === idx ? 0.7 : 1,
                    }}>
                    {item.content}
                    return (
                    <HlsVideoPlayer src={item.src} />
                </div>
            ))}
        </div>
    );
}

export default GridDrapDrop;