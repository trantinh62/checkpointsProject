import "./Header.css";
import $ from "jquery";
import { useEffect } from "react";

function Header() {
  const userName = sessionStorage.getItem("sessionUsername");
  const roleId = sessionStorage.getItem("sessionRoleId");
  const handleLogout = async () => {
    sessionStorage.clear();
  };

  useEffect(() => {
    $(window).on("scroll", function () {
      if ($(this).scrollTop() >= 200) {
        $(".navbar").addClass("fixed-top");
      } else if ($(this).scrollTop() == 0) {
        $(".navbar").removeClass("fixed-top");
      }
    });

    function adjustNav() {
      var winWidth = $(window).width(),
        dropdown = $(".dropdown"),
        dropdownMenu = $(".dropdown-menu");

      if (winWidth >= 768) {
        dropdown.on("mouseenter", function () {
          $(this).addClass("show").children(dropdownMenu).addClass("show");
        });

        dropdown.on("mouseleave", function () {
          $(this)
            .removeClass("show")
            .children(dropdownMenu)
            .removeClass("show");
        });
      } else {
        dropdown.off("mouseenter mouseleave");
      }
    }

    $(window).on("resize", adjustNav);

    adjustNav();
  });

  return (
    <div className="header-area overlay">
      <nav
        className="navbar navbar-expand-md navbar-dark"
        style={{ height: "5rem" }}
      >
        <div className="container">
          <a className="navbar-brand">Checkpoint 360</a>

          <button
            type="button"
            className="navbar-toggler collapsed"
            data-toggle="collapse"
            data-target="#main-nav"
          ></button>

          <div id="main-nav" className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="dropdown">
                <a className="nav-item nav-link" data-toggle="dropdown">
                  My checkpoints
                </a>
                <div className="dropdown-menu">
                  <a href="/mycheckpoints" className="dropdown-item">
                    List checkpoints
                  </a>
                  <a href="/histories" className="dropdown-item">
                    Checkpoint histories
                  </a>
                </div>
              </li>
              {roleId !== "3" && (
                <li className="dropdown">
                  <a className="nav-item nav-link" data-toggle="dropdown">
                    Manage checkpoints
                  </a>

                  <div className="dropdown-menu">
                    {roleId === "1" && (
                      <a href="/create" className="dropdown-item">
                        Create/Assign/Delete checkpoints
                      </a>
                    )}
                    {roleId === "1" && (
                      <a href="/gpoint" className="dropdown-item">
                        Update gpoint
                      </a>
                    )}
                    <a href="/histories/member" className="dropdown-item">
                      View member's checkpoint histories
                    </a>
                  </div>
                </li>
              )}
              {roleId === "1" && (
                <li className="dropdown">
                  <a className="nav-item nav-link" data-toggle="dropdown">
                    Manage users
                  </a>
                  <div className="dropdown-menu">
                    <a href="/invite" className="dropdown-item">
                      Invite users
                    </a>
                    <a href="/users" className="dropdown-item">
                      Update users
                    </a>
                  </div>
                </li>
              )}
            </ul>
          </div>
          <div
            id="main-nav"
            className="collapse navbar-collapse"
            style={{
              justifyContent: "right",
            }}
          >
            <ul className="navbar-nav">
              <li className="dropdown">
                <a className="nav-item nav-link" data-toggle="dropdown">
                  {userName}
                </a>
                <div className="dropdown-menu">
                  <a href="/profile" className="dropdown-item">
                    Profile
                  </a>
                  <a
                    href="/login"
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
