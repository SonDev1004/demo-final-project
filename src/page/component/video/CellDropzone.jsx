import React, {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import VideoPlayer from "./VideoPlayer.jsx";
import {initialData} from './Video.jsx';

const CELL_TYPE = "cell-dropzone";


function CellDropzone({idx, nodeId, onSwap, onClear}) {
    const node = initialData.find(n => n.id === nodeId);

    // Drag
    const [{isDragging}, dragRef] = useDrag({
        type: CELL_TYPE,
        item: {idx, nodeId},
        canDrag: !!nodeId,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    // Drop
    const [{isOver, canDrop}, dropRef] = useDrop({
        accept: CELL_TYPE,
        canDrop: (item) => item.idx !== idx,
        drop: (item) => {
            if (item.idx !== idx) onSwap(item.idx, idx);
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });

    const ref = useRef(null);
    dragRef(dropRef(ref));

    return (
        <div
            ref={ref}
            className={`cell-dropzone w-full aspect-video bg-white border border-gray-300 flex items-center justify-center rounded shadow text-3xl relative transition-all duration-150
      ${isOver && canDrop ? "ring-2 ring-green-500" : ""}
      ${isDragging ? "opacity-40" : ""}`}
            style={{cursor: nodeId ? "move" : "default"}}
            data-idx={idx}
        >
            {node ? (
                node.videoPath ? (
                    <div className="w-full h-full flex flex-col items-center justify-center relative">
                        <VideoPlayer src={node.videoPath}/>
                        <button
                            className="absolute top-1 right-1 px-2 py-2 flex items-center justify-center rounded-full text-white opacity-70 hover:opacity-100 hover:scale-110 duration-200"
                            onClick={e => {
                                e.stopPropagation();
                                onClear(idx);
                            }}
                            aria-label="Clear"
                        >
                            <i className="fa-solid fa-circle-xmark"></i>
                        </button>
                    </div>
                ) : (
                    <span className="text-blue-700 font-semibold">{nodeId}</span>
                )
            ) : (
                <span className="px-8 py-3 border-dashed border-gray-500 border-2 rounded-lg select-none">+</span>
            )}
        </div>
    );
}

export default CellDropzone;

