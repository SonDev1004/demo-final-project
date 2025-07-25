import React from "react";
import { Circle, Rect } from "react-konva";

function ControlPoints({
                           shapes,
                           selectedShapeIndex,
                           setShapes,
                           hoveredMidpointIndex,
                           setHoveredMidpointIndex,
                           hoverRealPoint,
                           setHoverRealPoint,
                       }) {
    if (selectedShapeIndex === null || !shapes[selectedShapeIndex]) return null;

    const shape = shapes[selectedShapeIndex];
    const offset = shape.dragOffset || { x: 0, y: 0 };
    const pts = shape.points;
    const len = pts.length;
    const controlElements = [];

    // Đỉnh thật (cam)
    for (let i = 0; i < pts.length; i += 2) {
        controlElements.push(
            <Circle
                key={"real-" + i}
                x={pts[i] + offset.x}
                y={pts[i + 1] + offset.y}
                radius={7}
                fill={hoverRealPoint === i ? "#333" : "orange"}
                draggable
                onDragMove={e => {
                    const newShapes = shapes.map((shapeObj, sidx) => {
                        if (sidx !== selectedShapeIndex) return shapeObj;
                        const newPoints = [...shapeObj.points];
                        newPoints[i] = e.target.x();
                        newPoints[i + 1] = e.target.y();
                        return { ...shapeObj, points: newPoints };
                    });
                    setShapes(newShapes);
                }}
                onDblClick={() => {
                    if (pts.length <= 4) return;
                    const newPts = pts.filter((_, idx) => idx !== i && idx !== i + 1);
                    const newShapes = shapes.map((shapeObj, idx2) =>
                        idx2 === selectedShapeIndex
                            ? { ...shapeObj, points: newPts }
                            : shapeObj
                    );
                    setShapes(newShapes);
                }}
                onMouseEnter={() => setHoverRealPoint(i)}
                onMouseLeave={() => setHoverRealPoint(null)}
            />
        );
    }

    // Trung điểm (ô vuông)
    const isClosed = shape.closed;
    for (let i = 0; i < len; i += 2) {
        const x1 = pts[i],
            y1 = pts[i + 1];
        let x2, y2, midKey, insertIdx;
        if (i + 2 < len) {
            x2 = pts[i + 2];
            y2 = pts[i + 3];
            midKey = i;
            insertIdx = i + 2;
        } else if (isClosed) {
            x2 = pts[0];
            y2 = pts[1];
            midKey = "last";
            insertIdx = len;
        } else {
            continue;
        }
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        controlElements.push(
            <Rect
                key={`mid-${midKey}`}
                x={mx + offset.x}
                y={my + offset.y}
                width={16}
                height={16}
                offsetX={8}
                offsetY={8}
                fill={hoveredMidpointIndex === i ? "#333" : "gray"}
                cornerRadius={2}
                onClick={() => {
                    const newPts = [...pts];
                    newPts.splice(insertIdx, 0, mx, my);
                    const newShapes = shapes.map((shapeObj, idx) =>
                        idx === selectedShapeIndex
                            ? { ...shapeObj, points: newPts }
                            : shapeObj
                    );
                    setShapes(newShapes);
                }}
                onMouseEnter={() => setHoveredMidpointIndex(i)}
                onMouseLeave={() => setHoveredMidpointIndex(null)}
            />
        );
    }
    return <>{controlElements}</>;
}

export default ControlPoints;