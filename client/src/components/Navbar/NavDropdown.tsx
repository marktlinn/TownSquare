import { useState, useRef, useEffect } from "react";

import NavItem from "./NavItem";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";

import style from "./Nav.module.scss";

const NavDropDown = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [loggedInMenuHidden, setLoggedInMenuHidden] = useState(false);
  const clickRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e: any) {
      if (clickRef.current) {
        if (!clickRef.current.contains(e.target as Node)) {
          setLoggedInMenuHidden(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickRef]);

  const toggleDropDown = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setLoggedInMenuHidden(state => !state);
  };

  const handleLogout = (e: any) => {
    e.preventDefault();
    // dispatch(logOut());
  };
  return (
    <div className={style.dropDownMenu} ref={clickRef}>
      <button className={style.imageContainer} onClick={e => toggleDropDown(e)}>
        <img
          src={user.profilePic || "/assets/profile/default.png"}
          alt=""
          className={style.userImg}
        />
      </button>

      <ul className={loggedInMenuHidden ? style.menuBox : style.hidden}>
        <NavItem
          output={"Profile"}
          direction={`/profile/${user?.username}`}
          setClicker={setClick}
          clicker={click}
          setLoggedInMenuHidden={setLoggedInMenuHidden}
        />

        <div
          onClick={e => {
            handleLogout(e);
          }}
        >
          <NavItem
            output={"Logout"}
            direction={"/"}
            setClicker={setClick}
            clicker={click}
            setLoggedInMenuHidden={setLoggedInMenuHidden}
          />
        </div>
      </ul>
    </div>
  );
};

export default NavDropDown;
