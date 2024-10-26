import React, { useCallback, useEffect, useState } from "react";
import "./searchModal.css";
import LandingService from "../../services/landing/landing";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SearchModal = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [manualSearch, setManualSearch] = useState(false);

  const fetchArticles = useCallback(() => {
    return LandingService.getArticles();
  }, []);

  const { data, loading, error } = useFetch(fetchArticles, {});

  useEffect(() => {
    if (data?.results && searchTerm.trim()) {
      const filtered = data.results.filter((article) => {
        const title = getTitleByLanguage(article);
        return title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles([]);
    }
  }, [data, searchTerm]);

  useEffect(() => {
    if (searchTerm && !manualSearch) {
      setManualSearch(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("search") || "";
    setSearchTerm(query);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setManualSearch(true);
  };

  const handleClose = () => {
    setSearchTerm("");
    onClose();
  };

  const getTitleByLanguage = (item) => {
    if (!item) return "";
    switch (i18n.language) {
      case "en":
        return item.title_en_us || item.title;
      case "uz-cyrl":
        return item.title_uz_Cyrl || item.title;
      case "ru":
        return item.title_ru || item.title;
      default:
        return item.title;
    }
  };

  return (
    <div
      className={`modal-backdrop ${isOpen ? "active" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`modal-content ${isOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder={t("Qidiruv")}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setManualSearch(false);
            }}
          />
          <ul>
            {loading ? (
              <p>{t("Yuklanmoqda...")}</p>
            ) : error ? (
              <p>{error.message}</p>
            ) : (
              <>
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((result, index) => (
                    <li key={index}>
                      <span>{getTitleByLanguage(result.category)}</span>
                      <Link
                        onClick={handleClose}
                        to={`/news/${result.id}?type=world`}
                      >
                        {getTitleByLanguage(result)}
                      </Link>
                    </li>
                  ))
                ) : (
                  <p>{t("Hech qanday natija topilmadi")}</p>
                )}
              </>
            )}
          </ul>
          <button type="submit">{t("Qidiruv")}</button>
        </form>

        {error && <p>Error fetching articles: {error.message}</p>}
      </div>
    </div>
  );
};

export default SearchModal;
