import React from "react";
import { Line, Circle } from "react-konva";

function DrawingLayer({
                          points,
                          mousePos,
                          drawing,
                          hoverFirstPoint,
                          setHoverFirstPoint,
                      }) {
    const getPreviewPoints = () => {
        if (drawing && points.length >= 2 && mousePos) {
            return [...points, mousePos.x, mousePos.y];
        }
        return points;
    };

    return (
        <>
            {points.length > 0 && (
                <Line
                    points={getPreviewPoints()}
                    stroke="red"
                    strokeWidth={2}
                    closed={false}
                    lineCap="round"
                    lineJoin="round"
                />
            )}
            {points.map((p, i) =>
                i % 2 === 0 ? (
                    <Circle
                        key={i}
                        x={points[i]}
                        y={points[i + 1]}
                        radius={i === 0 ? 8 : 4}
                        fill={
                            i === 0 ? (hoverFirstPoint ? "red" : "orange") : "blue"
                        }
                        onMouseEnter={
                            i === 0 && drawing
                                ? () => setHoverFirstPoint(true)
                                : undefined
                        }
                        onMouseLeave={
                            i === 0 ? () => setHoverFirstPoint(false) : undefined
                        }
                        style={{
                            cursor: i === 0 && drawing ? "pointer" : "default",
                        }}
                    />
                ) : null
            )}
        </>
    );
}

export default DrawingLayer;