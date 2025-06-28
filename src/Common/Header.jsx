import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const openSidebar = () => {
    const element = document.getElementById("sidebar");
    element.classList.add("active");
  };
  return (
    <header className="mb-3">
      <Link
        className="burger-btn d-block d-xl-none"
        onClick={openSidebar} style={{float:"left"}}
      >
        <i className="bi bi-justify fs-3" />
      </Link>
      <div className="rd-navbar-brand">
                  <a className="brand">
                    <img
                      src="jcvlogo.png"
                    //   src="jcvlogo.png"
                      alt="logo"
                      width={223}
                      height={50}
                      style={{height:'50px', width:'60px',objectFit:'contain',marginBottom:'5px'}}
                    />
                  </a>
                </div>
    </header>
  );
}

export default Header;
