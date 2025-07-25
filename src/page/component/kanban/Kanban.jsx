import React, {useState} from 'react';

const initialState = {
    todo: [
        {id: "1", content: "Task 1"},
        {id: "2", content: "Task 2"},
    ],
    inProgress: [],
    done: []
};

function Kanban() {
    const [columns, setColumns] = useState(initialState)
    const [dragged, setDragged] = useState(null)

    const onDragStart = (col, idx) => {
        // console.log(`Dragging item from ${col} at index ${idx}`);
        setDragged({col, idx})

    }

    const onDrop = (col) => {
        console.log(`Dropped item into ${col}`);

        if(!dragged) return;
        const item = columns[dragged.col][dragged.idx]
        const newSource = [...columns[dragged.col]];
        newSource.splice(dragged.idx, 1);
        const newDest = [...columns[col], item];
        setColumns({
            ...columns,
            [dragged.col]: newSource,
            [col]: newDest
        });
        setDragged(null);

    }

    const onDragOver = (e) => {
        e.preventDefault();
    }
    return (
        <div className="container mx-auto ">
            <div className="h-[calc(100vh-156px)]">
                <h1>Kanban Board</h1>
                <div className="flex gap-4">
                    {Object.entries(columns).map(([col, items])=>(
                        <div
                            key={col}
                            onDrop={()=> onDrop(col)}
                            onDragOver={onDragOver}
                            style={{
                                background: "#eee",
                                padding: 16,
                                minWidth: 200,
                                minHeight: 400,
                                borderRadius: 8,
                            }}
                        >
                            <h3>{col.toUpperCase()}</h3>
                            {items.map((item, idx)=>(
                                <div
                                    key={item.id}
                                    draggable
                                    onDragStart={()=> onDragStart(col, idx)}
                                    style={{
                                        background: "#456C86",
                                        color: "#fff",
                                        margin: "8px 0",
                                        padding: 12,
                                        borderRadius: 4,
                                        cursor: "grab"
                                    }}
                                >
                                    {item.content}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Kanban;