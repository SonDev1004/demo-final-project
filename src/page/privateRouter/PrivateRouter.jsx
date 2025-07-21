import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

function PrivateRouter() {
    const {isLogin} = useSelector((state) => state.auth)

    return isLogin ? <Outlet/> : <Navigate to="/login"/>
}

export default PrivateRouter;