


import React, { useState } from "react";
import logo from "@/assets/image/logo-white.png";

import { Link, useNavigate } from "react-router-dom";
import { RiLoginCircleFill } from "react-icons/ri";
import SearchBar from "./SearchBar";
import { RouteBlogAdd, RouteIndex, RouteProfile, RouteSignIn } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import usericon from "@/assets/image/user.png";
import { FaUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { removeUser } from "@/redux/user/user.slice";
import { showToast } from "@/helpers/showToast";
import { Button } from "./ui/button";
import {IoMdSearch} from "react-icons/io"
import { AiOutlineMenu } from "react-icons/ai";
import { useSidebar } from "./ui/sidebar";


const Topbar = () => {
  const {toggleSidebar} = useSidebar()
  const [showSearch ,setShowSearch] = useState(false)
  const user = useSelector((state) => state.user);
  const navigate =useNavigate()
  const dispatch = useDispatch()

  const handleLogout=async()=>{
     try {
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
            {
              method: "get",
            
              credentials: "include",
             
            }
          );
    
          const data = await response.json();
    
          if (!response.ok) {
            return showToast("error", data.message);
            
          }
          dispatch(removeUser())
          navigate(RouteIndex);
          showToast("success", data.message);
    
          
        } catch (error) {
          showToast("error", error.message);
        }
  }

  const toggleSearch=()=>{
setShowSearch(!showSearch)
  }

  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
      {/* Logo */}
      <div className="flex justify-center items-center gap-2">
        <button onClick={toggleSidebar} className="md:hidden" type="button"><AiOutlineMenu></AiOutlineMenu></button>
        <Link to={RouteIndex}><img src={logo} alt="Logo" className="h-10 md:w-auto w-48"  /></Link>
      </div>

      {/* Search */}
      <div className="w-[40rem]">
        <div className={`md:relative md:block  absolute bg-white left-0 w-full md:top-0 top-16 md:p-0 p-5 ${showSearch? 'block' : 'hidden'}`}>

        <SearchBar />
        </div>
      </div>

      {/* Auth/User Dropdown */}
      <div className="flex">
        <button onClick={toggleSearch} className="pr-3 md:hidden block " type="button"><IoMdSearch  size={25}></IoMdSearch></button>
        {!user.isLoggedIn ? (
          <Button asChild className="bg-blue-700 rounded-full gap-2">
            <Link to={RouteSignIn} className="flex items-center gap-2">
              <RiLoginCircleFill />
              Sign In
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={user.user?.avatar || usericon}
                  alt="User"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel><p className="cursor-pointer">{user.user.name}</p>
              <p className="text-sm">{user.user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link className="cursor-pointer" to={RouteProfile}>
                <FaUser/>
                Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={RouteBlogAdd} className="cursor-pointer" >
                <FaPlus/>
                Create Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem  onClick={handleLogout}>
                
                <AiOutlineLogout className=""/>
                Logout
                
              </DropdownMenuItem>
             
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Topbar;

