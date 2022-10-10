import "./Header.css";
import $ from "jquery";
import { useEffect } from "react";
import { updateLanguage } from "../../Api/userApi";
import Toast from "../../Components/Toast/Toast";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

function Header() {
  const { t } = useTranslation();
  const userName = sessionStorage.getItem("sessionUsername");
  const token = sessionStorage.getItem("sessionToken");
  const roleId = sessionStorage.getItem("sessionRoleId");
  const language = sessionStorage.getItem("sessionLanguage");
  const handleLogout = async () => {
    sessionStorage.clear();
  };

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      i18n.changeLanguage(language);
    } catch (err) {
      Toast(t("errorFetchData"), "error");
    }
  };

  const handleChangeLanguage = async (e) => {
    e.preventDefault();
    try {
      const languageValue = e.target.id;
      i18n.changeLanguage(languageValue);
      sessionStorage.setItem("sessionLanguage", languageValue);
      const updatelanguage = await updateLanguage(
        { language: languageValue === "en" ? 0 : 1 },
        token
      );
    } catch (err) {
      Toast(t("changeLangError"), "error");
    }
  };

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
                  {t("header.myCheckpoints")}
                </a>
                <div className="dropdown-menu">
                  <a href="/mycheckpoints" className="dropdown-item">
                    {t("header.listCheckpoints")}
                  </a>
                  <a href="/histories" className="dropdown-item">
                    {t("header.checkpointHistories")}
                  </a>
                </div>
              </li>
              {roleId !== "3" && (
                <li className="dropdown">
                  <a className="nav-item nav-link" data-toggle="dropdown">
                    {t("header.manageCheckpoints")}
                  </a>

                  <div className="dropdown-menu">
                    {roleId === "1" && (
                      <a href="/create" className="dropdown-item">
                        {t("header.crudCheckpoints")}
                      </a>
                    )}
                    {roleId === "1" && (
                      <a href="/gpoint" className="dropdown-item">
                        {t("header.updateGpoint")}
                      </a>
                    )}
                    <a href="/histories/member" className="dropdown-item">
                      {t("header.memberHistories")}
                    </a>
                  </div>
                </li>
              )}
              {roleId === "1" && (
                <li className="dropdown">
                  <a
                    href="#"
                    className="nav-item nav-link"
                    data-toggle="dropdown"
                  >
                    {t("header.manageUsers")}
                  </a>
                  <div className="dropdown-menu">
                    <a href="/invite" className="dropdown-item">
                      {t("header.inviteUser")}
                    </a>
                    <a href="/users" className="dropdown-item">
                      {t("header.updateUsers")}
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
                    {t("header.profile")}
                  </a>
                  <a
                    href="/login"
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    {t("header.logout")}
                  </a>
                </div>
              </li>
              <li className="dropdown">
                <a className="nav-item nav-link" data-toggle="dropdown">
                  <i className="bi bi-globe2"></i>
                </a>
                <div className="dropdown-menu">
                  <a
                    href="#"
                    className="dropdown-item"
                    id="vn"
                    onClick={handleChangeLanguage}
                  >
                    {t("header.vietnamese")}
                  </a>
                  <a
                    href="#"
                    className="dropdown-item"
                    id="en"
                    onClick={handleChangeLanguage}
                  >
                    {t("header.english")}
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
