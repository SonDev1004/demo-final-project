import React from 'react';
import GridDrapDrop from "../component/gridDrapDrop/GridDrapDrop.jsx";


function Home() {
    return (
        <div className="container mx-auto h-[calc(100vh-128px)] flex flex-col items-center justify-center">
            <h2 className="text-2xl">Demo Drag and Drop</h2>
            <GridDrapDrop/>
        </div>
    );
}

export default Home;