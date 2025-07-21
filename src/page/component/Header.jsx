import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutRequest} from "../../redux/actin/authAction.js";

function Header() {
    const {isLogin} = useSelector((state) => state.auth);

    const dispatch = useDispatch();


    function handleLogout() {
        dispatch(logoutRequest())
    }




    return (
        <div className="bg-gray-800 mx-auto- text-white">
            <div className="container mx-auto flex justify-between items-center ">
                <nav className='flex items-center h-[64px]'>
                    <div className="logo flex items-center mr-4">
                        <div className="text-2xl font-bold">Logo</div>
                    </div>
                    <Link className='px-6 py-2 text-white hover:opacity-70 cursor-pointer' to='/'>Home</Link>
                    <Link className='px-6 py-2 text-white hover:opacity-70 cursor-pointer' to='/video'>Video</Link>

                </nav>
                <div className="flex items-center">
                    {isLogin
                        ? <button
                            className="px-6 py-2  text-white hover:opacity-70 rounded transition-colors cursor-pointer"
                            type="button" onClick={handleLogout}>Logout</button>
                        : <Link className='px-6 py-2' to='/login'>Login</Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;