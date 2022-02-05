// next/react imports
import Link from 'next/link';
import { useContext } from 'react';

// components
import LatestCard from './LatestCard';

// contexts
import { UserContext } from '../contexts/UserContext';

// vendor imports
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import sliderStyles from '../styles/components/slider.module.scss';
import Slider from 'react-slick';
import 'remixicon/fonts/remixicon.css';

// styles
import styles from '../styles/components/latest.module.scss';

function Latest({}) {
  const { slider } = sliderStyles;
  const latest = Array(10).fill('');
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className={`row ${styles.latest}`}>
      <h1 className={styles.heading}>Latest Art</h1>
      <div className={slider}>
        <Slider {...settings}>
          {latest.map((el, i) => (
            <LatestCard key={`latest_${i}`} />
          ))}
        </Slider>
      </div>
    </section>
  );
}

function SampleNextArrow(props: { className?: any; style?: any; onClick?: any }) {
  const { className, style, onClick } = props;
  const { nextArrow } = sliderStyles;
  return (
    <div
      className={`${className} ${nextArrow}`}
      style={{
        ...style,
        display: 'block',
      }}
      onClick={onClick}
    >
      <i className="ri-arrow-right-s-line" />
    </div>
  );
}

function SamplePrevArrow(props: { className?: any; style?: any; onClick?: any }) {
  const { className, style, onClick } = props;
  const { prevArrow } = sliderStyles;
  return (
    <div className={`${className} ${prevArrow}`} style={{ ...style, display: 'block' }} onClick={onClick}>
      <i className="ri-arrow-left-s-line" />
    </div>
  );
}

export default Latest;
