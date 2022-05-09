import "./sidebar.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar() {

  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("http://localhost:5000/api/cats");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
        
        <div className="sidebarItem">
            <span className="sidebarTitle"> ABOUT ME </span>
            <img src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg" alt="" />
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit similique expedita nulla, adipisci earum quae laborum repudiandae praesentium minus, ipsam dolore autem esse rem ipsa commodi inventore sit culpa blanditiis.</p>
        </div>

        <div className="sidebarItem">
            <span className="sidebarTitle"> CATEGORIES </span>
            <ul className="sidebarList">
               {cats.map((c) => (
                <Link key={c._id} to={`/?cat=${c.name}`} className="link">
                    <li className="sidebarListItem">{c.name}</li>
                </Link>
              ))}
            </ul>
        </div>

        <div className="sidebarItem">
            <span className="sidebarTitle"> FOLLOW US </span>
            <div className="sidebarSocial">
              <i className="sidebarIcon fa-brands fa-facebook"></i>
              <i className="sidebarIcon fa-brands fa-youtube"></i>
              <i className="sidebarIcon fa-brands fa-twitter"></i>
              <i className="sidebarIcon fa-brands fa-instagram"></i>
            </div>
        </div>
    </div>
  )
}
