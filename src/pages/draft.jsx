<div className="news-layout">
          <div className="main-news-wrapper">
            <div className="top-news">
              <section className="main-news">
                <Swiper
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={10}
                  slidesPerView={1}
                  className="mySwiper"
                >
                  {topNews?.map((news, index) => (
                    <SwiperSlide key={index}>
                      <div className="top-news-card">
                        <div className="img-wrapper">
                          <img
                            src={news.image || "default_image_path.jpg"}
                            alt={news.title}
                          />
                          <div className="category">
                            <span>{formDate(news.created_at)}</span>
                          </div>
                          <Link to={`/news/${news.id}?type=world`}>
                            {getTitleByLanguage(news)}
                          </Link>
                          {/* <p className="description">
                            {getTitleByLanguage(news)}...
                          </p> */}
                        </div>
                        </div>
                        <div className="news-info">
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </section>
            </div>
            <div className="bottom-news">
              {bottomNews?.map((news, index) => (
                <div className="news-card" key={index}>
                  <div className="img-wrapper">
                    <img
                      src={news.image || "default_image_path.jpg"}
                      alt={news.title}
                    />
                  </div>
                  <div className="news-info">
                    <div className="category">
                      <span>{formDate(news.created_at)}</span>
                    </div>
                    <Link to={`/news/${news.id}?type=world`}>
                      {getTitleByLanguage(news)}
                    </Link>
                    <p className="description">
                      {getTitleByLanguage(news)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="side-news">
            {sideNews?.map((news, index) => (
              <div className="side-news-card" key={index}>
                <div className="img-wrapper">
                  <img
                    src={news.image || "default_image_path.jpg"}
                    alt={news.title}
                  />
                </div>
                <div className="news-info">
                  <div className="category">
                    <span>{formDate(news.created_at)}</span>
                  </div>
                  <Link to={`/news/${news.id}?type=world`}>
                    {getTitleByLanguage(news)}
                  </Link>
                </div>
              </div>
            ))}
          </aside>
        </div>