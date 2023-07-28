import Nav from "components/Nav";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import img1 from "asset/proto_1.jpg";
import img2 from "asset/proto_2.jpg";
import img3 from "asset/proto_3.jpg";

// import "./styles.css";

// import required modules
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper";

export default function Header() {
  return (
    <div className="header_swiper_xs">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <header>
            <img src={img1} alt="" />
            <div className="nav_main">
              <Nav />
              <div className="main_caption">
                <div className="wrapper">
                  <h1>Creating </h1>
                  <h2>Millionaires</h2>
                </div>
              </div>
            </div>
          </header>
        </SwiperSlide>
        <SwiperSlide>
          <header>
            <img src={img2} alt="" />
            <div className="nav_main">
              <Nav />
              <div className="main_caption">
                <div className="wrapper">
                  <h1>Creating </h1>
                  <h2>Millionaires</h2>
                </div>
              </div>
            </div>
          </header>
        </SwiperSlide>
        <SwiperSlide>
          <header>
            <img src={img3} alt="" />
            <div className="nav_main">
              <Nav />
              <div className="main_caption">
                <div className="wrapper">
                  <h1>Creating </h1>
                  <h2>Millionaires</h2>
                </div>
              </div>
            </div>
          </header>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
