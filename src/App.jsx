import './App.css'
import {useRoutes} from "react-router-dom";
import Home from "./page/privateRouter/Home.jsx";
import Login from "./page/publicRouter/Login.jsx";
import PrivateRouter from "./page/privateRouter/PrivateRouter.jsx";
import Video from "./page/component/video/Video.jsx";
import {ToastContainer} from "react-toastify";
import Header from "./page/component/Header.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from "./page/component/Footer.jsx";
import Instance from "./page/component/instance/instance.jsx";
import Kanban from "./page/component/kanban/Kanban.jsx";
import Canvas from "./page/component/canvas/Canvas.jsx";

function App() {

    const routes = [
        {
            element: <PrivateRouter/>, children: [
                {path: "/", element: <Home/>},
                {path: "/video", element: <Video/>},
                {path: "/instance", element: <Instance/>},
                {path: "/kanban", element: <Kanban />},
                {path: "/canvas", element: <Canvas />},
            ]
        },
        {path: '/login', element: <Login/>},
    ];
    const elementRoutes = useRoutes(routes)
    return (
        <div className='w-full'>
            <Header  />
            {elementRoutes}
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default App
