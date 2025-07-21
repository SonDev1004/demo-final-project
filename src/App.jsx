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

function App() {
    // const {isLogin} = useSelector((state) => state.auth);


    const routes = [
        {
            element: <PrivateRouter/>, children: [
                {path: "/", element: <Home/>},
                {path: "/video", element: <Video/>},
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
