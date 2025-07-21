import React, {useEffect, useRef, useState} from "react";
import $ from "jquery";
import "jstree/dist/jstree.min.js";
import "jstree/dist/themes/default/style.min.css";
import 'video.js/dist/video-js.css';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import CellDropzone from "./CellDropzone.jsx";

// eslint-disable-next-line react-refresh/only-export-components
export const initialData = [
    {id: "root_1", text: "Area 1", parent: "#", state: {opened: true}},
    {
        id: "child_1_1",
        text: "ae1-camera1",
        parent: "root_1",
        icon: "fa fa-camera",
        videoPath: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        id: "child_1_2",
        text: "ae1-camera2",
        parent: "root_1",
        icon: "fa fa-camera",
        videoPath: "https://www.w3schools.com/html/movie.mp4"
    },
    {id: "root_2", text: "Area 2", parent: "#"},
    {
        id: "child_2_1",
        text: "ae2-camera1",
        parent: "root_2",
        icon: "fa fa-camera",
        videoPath: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        id: "child_2_2",
        text: "ae2-camera2",
        parent: "root_2",
        icon: "fa fa-camera",
        videoPath: "https://www.w3schools.com/html/movie.mp4"
    },
    {id: "root_3", text: "Area 3", parent: "#"},
    {
        id: "child_3_1",
        text: "ae3-camera1",
        parent: "root_3",
        icon: "fa fa-camera",
        videoPath: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        id: "child_3_2",
        text: "ae3-camera2",
        parent: "root_3",
        icon: "fa fa-camera",
        videoPath: "https://www.w3schools.com/html/movie.mp4"
    }
];

function JsTreeDragToDivJquery() {
    const treeRef = useRef(null);
    const contentRef = useRef(null);
    const isDragging = useRef(false);
    const draggingNodeId = useRef(null);
    const hoveredCellRef = useRef(null);
    const [_, setHoveredCell] = useState(null);
    const [cellNodeIds, setCellNodeIds] = useState(Array(9).fill(null));

    // jsTree DND (kéo từ cây vào cell)
    useEffect(() => {
        $(treeRef.current).jstree({
            core: {check_callback: true, data: initialData},
            plugins: ["dnd", "wholerow"],
        });

        $(document).on("dnd_move.vakata", function (e, data) {
            const evt = data.event;
            if (!evt) return;
            const x = evt.clientX;
            const y = evt.clientY;
            const elUnder = document.elementFromPoint(x, y);

            const draggingId = draggingNodeId.current;
            let isDuplicate = false;
            if (draggingId && cellNodeIds.includes(draggingId)) {
                isDuplicate = true;
            }

            let cell = elUnder && (elUnder.classList?.contains("cell-dropzone") ? elUnder : elUnder.closest?.(".cell-dropzone"));
            // Xóa tất cả viền xanh trước khi x��� lý
            $(".cell-dropzone").removeClass("ring-2 ring-blue-500");

            if (cell) {
                setHoveredCell(cell.dataset.idx);
                hoveredCellRef.current = cell.dataset.idx;
                if (isDuplicate) {
                    cell.classList.add("drop-duplicate");
                } else {
                    cell.classList.remove("drop-duplicate");
                    // Nếu hợp lệ thì thêm viền xanh
                    cell.classList.add("ring-2", "ring-green-500");
                }
            } else {
                setHoveredCell(null);
                hoveredCellRef.current = null;
            }

            const isOverCell = !!cell;
            const $vakata = $("#vakata-dnd");
            if ($vakata.length > 0) {
                if (isOverCell && !isDuplicate) {
                    $vakata.find("i.jstree-er").removeClass("jstree-er").addClass("jstree-ok");
                } else {
                    $vakata.find("i.jstree-ok").removeClass("jstree-ok").addClass("jstree-er");
                }
            }
        });

        $(document).on("dnd_start.vakata", function (e, data) {
            isDragging.current = true;
            draggingNodeId.current = data.data.nodes[0];
        });

        function preventDuplicateDrop(draggindId, data) {
            if (cellNodeIds.includes(draggindId)) {
                if (data.helper) {
                    $(data.helper).remove();
                }
                if (data.event) {
                    data.event.preventDefault();
                    data.event.stopPropagation();
                }
                return true;
            }
            return false;
        }

        $(document).on("dnd_stop.vakata", function (e, data) {
            // Loại bỏ tất cả viền xanh ở các item khi dừng kéo thả
            $(".cell-dropzone").removeClass("ring-2 ring-green-500");
            const draggindId = data.data.nodes[0];
            if (preventDuplicateDrop(draggindId, data)) return;

            if (isDragging.current && hoveredCellRef.current !== null && draggingNodeId.current) {
                setCellNodeIds(prev => {
                    const next = [...prev];
                    next[Number(hoveredCellRef.current)] = draggingNodeId.current;
                    return next;
                });
            }
            isDragging.current = false;
            draggingNodeId.current = null;
            setHoveredCell(null);
            hoveredCellRef.current = null;
        });

        return () => {
            $(treeRef.current).jstree("destroy");
            $(document).off("dnd_move.vakata");
            $(document).off("dnd_start.vakata");
            $(document).off("dnd_stop.vakata");
        };
    }, [cellNodeIds]);

    // Hoán đổi vị trí giữa 2 cell (react-dnd)
    const handleSwap = (fromIdx, toIdx) => {
        setCellNodeIds(prev => {
            const newArr = [...prev];
            [newArr[fromIdx], newArr[toIdx]] = [newArr[toIdx], newArr[fromIdx]];
            return newArr;
        });
    };

    // Xóa node khỏi cell
    const handleClear = idx => {
        setCellNodeIds(prev => {
            const next = [...prev];
            next[idx] = null;
            return next;
        });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="container mx-auto flex ">
                {/* sidebar: cây jsTree bên trái */}
                <div className="w-1/4 bg-amber-200  p-2 overflow-y-auto transition-all">
                    <b>Sidebar (jsTree)</b>
                    <div ref={treeRef}></div>
                </div>
                {/* content: vùng drop các ô bên phải */}
                <div
                    ref={contentRef}
                    className="w-3/4 h-[calc(100vh-128px)] bg-blue-200 p-2 overflow-y-auto transition-all"
                    style={{minHeight: 200}}
                >
                    <b>Content (Drop Here)</b>
                    <div className="mt-4 text-gray-500">
                        Kéo item từ cây bên trái vào các ô bên dưới!<br/>
                        Kéo các ô bên dưới để hoán đổi vị trí video!
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
                            {cellNodeIds.map((nodeId, i) => (
                                <CellDropzone
                                    key={i}
                                    idx={i}
                                    nodeId={nodeId}
                                    onSwap={handleSwap}
                                    onClear={handleClear}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
}

export default JsTreeDragToDivJquery;
