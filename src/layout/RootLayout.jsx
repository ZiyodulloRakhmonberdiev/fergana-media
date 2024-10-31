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
import Weather from "../components/weather/Weather";

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
  const [selectedRegion, setSelectedRegion] = useState("Farg'ona"); // Default region

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  useEffect(() => {
    localStorage.setItem("activeIndex", activeIndex);
  }, [activeIndex]);

  const { data, loading, error } = useFetch(LandingService.getNavbar);

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

  const languages = [
    { code: "uz-latn", label: "O'zbek", flag: "/images/uz.svg" },
    // { code: "uz-cyrl", label: "Ўзбек", flag: "/images/uz.svg" },
    { code: "en", label: "English", flag: "/images/uk.svg" },
    { code: "ru", label: "Русский", flag: "/images/ru.svg" },
  ];
  const selectedLangData = languages?.find(
    (lang) => lang?.code === selectedLanguage
  );
  

  return (
    <div className="root-layout">
      <header className={`header ${isHeaderVisible ? "" : "hidden"}`}>
        <div className="header-top">
          <div className="container">
            <div className="logo">
              <NavLink to="/">
                <img
                  width={150}
                  src={images.logoLight}
                  alt="logo"
                  className="only-desktop"
                />
                <img
                  width={150}
                  src={images.img9901}
                  className="only-mobile"
                  alt="logo"
                />
              </NavLink>
            </div>
            <div className="logo-center">
              {" "}
              <p>Fergana Media</p>{" "}
            </div>
            <div className="language">
            <div className="only-desktop">
            <Weather selectedRegion={selectedRegion} onRegionChange={handleRegionChange} />
            </div>
              <div className="search">
                <i
                  className="fa-solid fa-magnifying-glass"
                  onClick={toggleSearch}
                ></i>
              </div>
              <div onClick={toggleDropdown} className="language-selector">
                <span className="dropdown-toggle">
                  <img
                    src={selectedLangData?.flag}
                    alt={selectedLangData?.label}
                    className="selected-flag"
                  />
                  {selectedLangData?.label?.slice(0, 3) || "Til"}
                </span>
                <i className="fa-solid fa-chevron-down"></i>
                <div
                  className={`dropdown-menu ${activeDropdown ? "active" : ""}`}
                >
                  {languages.map(({ code, label, flag }) => (
                    <div
                      key={code}
                      onClick={() => changeLanguage(code)}
                      className="dropdown-item"
                    >
                      <img src={flag} alt={label} className="flag-icon" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
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
        <div className="header-middle-social">
          <div className="header-top-social">
            <a href="" className="ins">
              <img src="/images/ins.svg" alt="" />
            </a>
            <a href="" className="tg">
              <img src="/images/tg.svg" alt="" />
            </a>
            <a href="" className="yt">
              <img src="/images/yt.svg" alt="" />
            </a>
            <a href="" className="fb">
              <img src="/images/fb.svg" alt="" />
            </a>
          </div>
          <div className="dark-mode-toggle">
          <Weather selectedRegion={selectedRegion} className="only-mobile" onRegionChange={handleRegionChange} />
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={toggleSearch}
            ></i>
            <i
              onClick={toggleTheme}
              className={`fa-regular fa-${isDarkMode ? "moon" : "sun"}`}
            ></i>
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
              <div className="header-top-social">
                <a href="" className="ins">
                  <img src="/images/ins.svg" alt="" />
                </a>
                <a href="" className="tg">
                  <img src="/images/tg.svg" alt="" />
                </a>
                <a href="" className="yt">
                  <img src="/images/yt.svg" alt="" />
                </a>
                <a href="" className="fb">
                  <img src="/images/fb.svg" alt="" />
                </a>
              </div>
              <div className="dark-mode-toggle">
                <i
                  className="fa-solid fa-magnifying-glass"
                  onClick={toggleSearch}
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
                style={{ width: "250px", height: "50px", objectFit: "cover" }}
                src={!isDarkMode ? images.logoDark : images.logo2}
                alt="logo"
                className="footer-logo"
              />
              <p>{t("Yangiliklarimiz xalq uchun")}</p>
              <div className="header-top-social">
                <a href="" className="ins">
                  <img src="/images/ins.svg" alt="" />
                </a>
                <a href="" className="tg">
                  <img src="/images/tg.svg" alt="" />
                </a>
                <a href="" className="yt">
                  <img src="/images/yt.svg" alt="" />
                </a>
                <a href="" className="fb">
                  <img src="/images/fb.svg" alt="" />
                </a>
              </div>
            </div>
            <div className="item">
              <div className="title">{t("Kontaktlarimiz")}</div>
              <ul>
                <li>
                  {t("Manzil")}: {t("Toshkent shaxar, Guliston")}
                </li>
                <li>{t("email")}: ferganamedia@gmail.uz</li>
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
