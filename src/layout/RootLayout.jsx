import React from "react";
import { useEffect, useState } from "react";
import api from "../services/api";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./rootLayout.css";
import images from "./../images/index";
import { useTranslation } from "react-i18next";
import SearchModal from "../components/searchModal/SearchModal";
import useFetch from "./../hooks/useFetch";
import LandingService from "../services/landing/landing";
import ScrollToTopButton from "../components/ScrollToTopButton/ScrollToTopButton";

function RootLayout() {
  const [categories, setCategories] = useState([]);
  const { t, i18n } = useTranslation();
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [activeIndex, setActiveIndex] = useState(() => {
    const savedIndex = localStorage.getItem("activeIndex");
    return savedIndex !== null ? parseInt(savedIndex, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem("activeIndex", activeIndex);
  }, [activeIndex]);

  const { data, loading, error } = useFetch(LandingService.getNavbar);

  // const changeLanguage = async (lang) => {
  //   try {
  //     await i18n.changeLanguage(lang.toLowerCase());
  //     setActiveDropdown(false);
  //     // await fetchCategories();
  //   } catch (error) {
  //     console.error("Error updating language:", error);
  //   }
  // };
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const changeLanguage = async (lang) => {
    try {
      await i18n.changeLanguage(lang.toLowerCase());
      setSelectedLanguage(lang); // Tanlangan tilni saqlash
      setActiveDropdown(false);
    } catch (error) {
      console.error("Error updating language:", error);
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(`/${i18n.language.toLowerCase()}/`);

        if (response.status === 200) {
          setCategories(response.data);
        } else {
          console.error("Failed to load categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [i18n.language]);

  const toggleDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-mode");
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const toggleOpenSidebar = () => {
    setIsOpen((prev) => {
      if (!prev) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      return !prev;
    });
  };

  useEffect(() => {
    const handleBodyClick = (event) => {
      if (
        !event.target.closest(".sidebar") &&
        !event.target.closest(".hamburger-menu")
      ) {
        setIsOpen(false);
        document.body.style.overflow = "auto";
      }
    };

    if (isOpen) {
      document.body.addEventListener("click", handleBodyClick);
    } else {
      document.body.removeEventListener("click", handleBodyClick);
    }

    return () => document.body.removeEventListener("click", handleBodyClick);
  }, [isOpen]);

  const getTitleByLanguage = (item) => {
    switch (i18n.language) {
      case "en":
        return item.title_en_us || item.title;
      case "uz-latn":
        return item.title_uz_Latn || item.title;
      case "uz-cyrl":
        return item.title_uz_Cyrl || item.title;
      case "ru":
        return item.title_ru || item.title;
      default:
        return item.title;
    }
  };

  const navItems = [
    // {
    //   path: "/",
    //   label: t("Home"),
    //   categoryId: -2,
    // },
    ...(data?.results?.map((item) => ({
      path: item.path,
      label: getTitleByLanguage(item),
      categoryId: item.id,
    })) || []),
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > prevScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  return (
    <div className="root-layout">
      <header className={`header ${isHeaderVisible ? "" : "hidden"}`}>
        <div className="header-top">
          <div className="container">
            <div className="logo">
              <NavLink to="/">
                <img width={150} src={images.img9901} alt="logo" />
              </NavLink>
            </div>
            <div className="logo-center">{/* <p>Fergana Media</p> */}</div>
            <div className="language">
              <div className="search">
                <i
                  className="fa-solid fa-magnifying-glass"
                  onClick={toggleSearch}
                ></i>
              </div>
              <div className="language-selector">
                {["uz-latn", "uz-cyrl", "en", "ru"].map((lang) => (
                  <span
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    style={{
                      display: selectedLanguage === lang ? "none" : "block",
                    }}
                  >
                    {t(
                      lang === "uz-latn"
                        ? "UZ"
                        : lang === "uz-cyrl"
                        ? "УЗ"
                        : lang === "en"
                        ? "EN"
                        : "РУ"
                    )}
                  </span>
                ))}
              </div>

              {/* <div className="hamburger-menu">
                <i
                  className="fa-solid fa-magnifying-glass"
                  onClick={toggleSearch}
                ></i>
                <i onClick={toggleOpenSidebar} className="fa-solid fa-bars"></i>
              </div> */}
            </div>
          </div>
        </div>
        <div className="header-main">
          <div className="container">
            <nav>
              <ul>
                {navItems.map((item, index) => (
                  <li
                    key={index}
                    className={activeIndex === index ? "active" : ""}
                    onClick={() => setActiveIndex(index)}
                  >
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to={
                        item.path === "/" ? "/" : `/category/${item.categoryId}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="header-right-items">
              <div className="dark-mode-toggle">
                <i
                  onClick={toggleTheme}
                  className={`fa-regular fa-${isDarkMode ? "moon" : "sun"}`}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <div className="container">
          <div className="items">
            <div className="item">
              <img
                // width={150}
                style={{ width: "250px", height: "50px", objectFit: "cover" }}
                src={!isDarkMode ? images.logoDark : images.logo2}
                alt="logo"
              />
              <p>{t("Yangiliklarimiz xalq uchun")}</p>
              <div className="social-networks">
                <i className="fab fa-instagram"></i>
                <i className="fab fa-telegram"></i>
                <i className="fab fa-facebook"></i>
                <i className="fab fa-youtube"></i>
              </div>
            </div>
            <div className="item">
              <div className="title">{t("Kontaktlarimiz")}</div>
              <ul>
                <li>
                  {t("Manzil")}: {t("Toshkent shaxar, Guliston")}
                </li>
                <li>{t("email")}: Ferganamedia@gmail.uz</li>
                <li>{t("phone")}: +998 (93) 123-45-67</li>
              </ul>
            </div>
            <div className="item">
              <div className="title">{t("Sayt xaqida")}</div>
              <ul>
                <li>
                  {t(
                    "Veb sayt OAV sifatida 2018 yil 28 oktyabr kuni Uzbekistan Respublikasi Prezidenti Adminstratsiyasi xuzuridagi Axborot va ommaviy kommunikatsiyalar agentligidan 1089 raqam ro’yxatga olingan."
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bottom">
          <p>
            © created by{" "}
            <a target="_blank" href="https://fassco.uz">
              Fassco
            </a>{" "}
            company
          </p>
        </div>
      </footer>

      <ScrollToTopButton />
      <SearchModal isOpen={isSearchOpen} onClose={toggleSearch} />
    </div>
  );
}

export default RootLayout;
