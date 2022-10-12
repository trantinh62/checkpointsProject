import "./Header.css";
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

          <button type="button" className="navbar-toggler collapsed"></button>

          <div className="">
            <div className="dropdown">
              <button className="dropbtn">{t("header.myCheckpoints")}</button>
              <div className="dropdown-content">
                <a href="/mycheckpoints">{t("header.listCheckpoints")}</a>
                <a href="/histories">{t("header.checkpointHistories")}</a>
              </div>
            </div>
            {roleId !== "3" && (
              <div className="dropdown ">
                <button className="dropbtn">
                  {t("header.manageCheckpoints")}
                </button>
                <div className="dropdown-content">
                  {roleId === "1" && (
                    <a href="/create">{t("header.crudCheckpoints")}</a>
                  )}
                  {roleId === "1" && (
                    <a href="/gpoint">{t("header.updateGpoint")}</a>
                  )}
                  <a href="/histories/member">{t("header.memberHistories")}</a>
                </div>
              </div>
            )}
            {roleId !== "3" && (
              <div className="dropdown ">
                <button className="dropbtn">{t("header.manageUsers")}</button>
                <div className="dropdown-content">
                  <a href="/invite">{t("header.inviteUser")}</a>
                  <a href="/users">{t("header.updateUsers")}</a>
                </div>
              </div>
            )}
          </div>
          <div className="dropdown-right">
            <div className="dropdown">
              <button className="dropbtn"> {userName}</button>
              <div className="dropdown-content">
                <a href="/profile">{t("header.profile")}</a>
                <a href="/login" onClick={handleLogout}>
                  {t("header.logout")}
                </a>
              </div>
            </div>
            <div className="dropdown">
              <button className="dropbtn">
                <i className="bi bi-globe2"></i>
              </button>
              <div className="dropdown-content">
                <a
                  href="/"
                  className="dropdown-item"
                  id="vn"
                  onClick={handleChangeLanguage}
                >
                  {t("header.vietnamese")}
                </a>
                <a
                  href="/"
                  className="dropdown-item"
                  id="en"
                  onClick={handleChangeLanguage}
                >
                  {t("header.english")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
