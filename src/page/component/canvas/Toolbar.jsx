import React from "react";

function Toolbar({ drawing, mode, setMode, finishDrawing }) {
    return (
        <div className="flex flex-col gap-2">
            {drawing && (
                <button
                    className="h-12 w-32 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={finishDrawing}
                >
                    Kết thúc vẽ
                </button>
            )}
            <button
                className={`h-12 w-32 px-4 py-2 rounded transition ${
                    mode === "draw"
                        ? "bg-blue-700 text-white"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                onClick={() => setMode("draw")}
            >
                Vẽ mới
            </button>
            <button
                className={`h-12 w-32 px-4 py-2 rounded transition ${
                    mode === "select"
                        ? "bg-blue-700 text-white"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                onClick={() => setMode("select")}
            >
                Chọn shape
            </button>
        </div>
    );
}

export default Toolbar;