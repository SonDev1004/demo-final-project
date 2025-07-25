import React from "react";
import { Line } from "react-konva";

function ShapeLayer({
                        shapes,
                        selectedShapeIndex,
                        hoveredShapeIndex,
                        setSelectedShapeIndex,
                        setHoveredShapeIndex,
                        setShapes,
                        mode,
                    }) {
    return (
        <>
            {shapes.map((shape, idx) => (
                <React.Fragment key={idx}>
                    {/* Hit area cực rộng để bắt hover/click */}
                    <Line
                        points={shape.points}
                        stroke="transparent"
                        strokeWidth={20}
                        closed={shape.closed}
                        onClick={() => {
                            if (mode === "select") setSelectedShapeIndex(idx);
                        }}
                        onTap={() => {
                            if (mode === "select") setSelectedShapeIndex(idx);
                        }}
                        onMouseEnter={() => setHoveredShapeIndex(idx)}
                        onMouseLeave={() => setHoveredShapeIndex(null)}
                        listening={true}
                        draggable={selectedShapeIndex === idx}
                    />
                    {/* Shape thật, KÉO THẢ được nếu đang chọn */}
                    <Line
                        opacity={1}
                        points={shape.points}
                        stroke={
                            selectedShapeIndex === idx
                                ? "orange"
                                : hoveredShapeIndex === idx
                                    ? "blue"
                                    : "green"
                        }
                        strokeWidth={selectedShapeIndex === idx ? 4 : 3}
                        closed={shape.closed}
                        fill={shape.closed ? "rgba(255, 165, 0, 0.3)" : undefined}
                        lineCap="round"
                        lineJoin="round"
                        opacity={0.8}
                        draggable={selectedShapeIndex === idx}
                        onDragMove={e => {
                            const dx = e.target.x();
                            const dy = e.target.y();
                            setShapes(shapes =>
                                shapes.map((s, i) =>
                                    i === idx ? { ...s, dragOffset: { x: dx, y: dy } } : s
                                )
                            );
                        }}
                        onDragEnd={e => {
                            const dx = e.target.x();
                            const dy = e.target.y();
                            const movedPoints = shape.points.map((val, i) =>
                                i % 2 === 0 ? val + dx : val + dy
                            );
                            setShapes(shapes =>
                                shapes.map((s, i) =>
                                    i === idx
                                        ? {
                                            ...s,
                                            points: movedPoints,
                                            dragOffset: { x: 0, y: 0 },
                                        }
                                        : s
                                )
                            );
                            e.target.position({ x: 0, y: 0 });
                        }}
                        onClick={() => {
                            if (mode === "select") setSelectedShapeIndex(idx);
                        }}
                        onTap={() => {
                            if (mode === "select") setSelectedShapeIndex(idx);
                        }}
                    />
                </React.Fragment>
            ))}
        </>
    );
}

export default ShapeLayer;