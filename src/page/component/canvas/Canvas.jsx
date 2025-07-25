import React, {useEffect, useState} from 'react';
import {Image, Layer, Stage} from 'react-konva';
import Toolbar from "./Toolbar.jsx";
import ShapeLayer from "./ShapeLayer.jsx";
import ControlPoints from "./ControlPoints.jsx";
import DrawingLayer from "./DrawingLayer.jsx";

function Canvas() {
    const imageUrl = 'https://plus.unsplash.com/premium_photo-1690958385391-76844034f557?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    const [image, setImage] = useState(null);
    const [shapes, setShapes] = useState([]);
    const [points, setPoints] = useState([]);
    const [drawing, setDrawing] = useState(false);
    const [mousePos, setMousePos] = useState(null);
    const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);
    const [hoveredShapeIndex, setHoveredShapeIndex] = useState(null);
    const [hoveredMidpointIndex, setHoveredMidpointIndex] = useState(null)
    const [hoverFirstPoint, setHoverFirstPoint] = useState(false)
    const [hoverRealPoint, setHoverRealPoint] = useState(null)
    const [mode, setMode] = useState('draw');

    useEffect(() => {
        const img = new window.Image();
        img.src = imageUrl;
        img.onload = () => setImage(img);
    }, [imageUrl]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.code === 'Enter' || e.code === 'Space') && drawing) {
                finishDrawing(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [drawing, points, shapes]);

    const handleMouseMove = (e) => {
        // e: sự kiện của Konva.
        // e.evt: sự kiện gốc của DOM.
        if (drawing) {
            setMousePos({
                x: e.evt.layerX,
                y: e.evt.layerY
            });
        }
    };

    const finishDrawing = (closed = false) => {
        if (points.length > 3) {
            setShapes([...shapes, {points, closed}]);
        }
        setPoints([]);
        setDrawing(false);
        setMousePos(null);
        setMode('select');
    };

    const handleMouseDown = (e) => {
        if (mode === "draw") {
            const x = e.evt.layerX
            const y = e.evt.layerY;

            // Nếu đang vẽ, có ít nhất 2 đoạn thẳng (4 số)
            if (drawing && points.length >= 4) {
                const dx = points[0] - x;
                const dy = points[1] - y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 12) { // 12 pixel hoặc bán kính của điểm đầu
                    // // Nếu điểm đầu gần điểm cuối, kết thúc vẽ
                    finishDrawing(true);
                    return;
                }
            }

            // Nếu chưa vẽ thì bắt đầu, nếu đang vẽ thì thêm điểm mới
            if (!drawing) {
                setDrawing(true);
                setPoints([e.evt.layerX, e.evt.layerY]);
                setSelectedShapeIndex(null);
            } else {
                setPoints([...points, e.evt.layerX, e.evt.layerY]);
            }
        }
    };

    return (
        <div className="container mx-auto ">
            <div className="h-[calc(100vh-156px)]">
                <div className="flex">
                    <Toolbar
                        drawing={drawing}
                        mode={mode}
                        setMode={setMode}
                        finishDrawing={finishDrawing}
                    />
                    <div className="flex flex-5/6">
                        <Stage className="flex justify-center items-center"
                               width={800} height={600}
                               onMouseMove={handleMouseMove}
                        >
                            <Layer onMouseDown={handleMouseDown}>
                                {image && <Image image={image} width={800} height={600}/>}
                                <ShapeLayer
                                    shapes={shapes}
                                    selectedShapeIndex={selectedShapeIndex}
                                    hoveredShapeIndex={hoveredShapeIndex}
                                    setSelectedShapeIndex={setSelectedShapeIndex}
                                    setHoveredShapeIndex={setHoveredShapeIndex}
                                    setShapes={setShapes}
                                    mode={mode}
                                />
                                <DrawingLayer
                                    points={points}
                                    mousePos={mousePos}
                                    drawing={drawing}
                                    hoverFirstPoint={hoverFirstPoint}
                                    setHoverFirstPoint={setHoverFirstPoint}
                                />

                                <ControlPoints
                                    shapes={shapes}
                                    selectedShapeIndex={selectedShapeIndex}
                                    setShapes={setShapes}
                                    hoveredMidpointIndex={hoveredMidpointIndex}
                                    setHoveredMidpointIndex={setHoveredMidpointIndex}
                                    hoverRealPoint={hoverRealPoint}
                                    setHoverRealPoint={setHoverRealPoint}
                                />
                            </Layer>
                        </Stage>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Canvas;