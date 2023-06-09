import React from 'react';
import './CarouselBgImages.scss';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../assets/restaurant1.jpg';
import img2 from '../../assets/restaurant2.jpg';
import img3 from '../../assets/restaurant3.jpg';

// Pour le moment les images sont importés en statique
function CarouselBgImages() {
  return (
    <div className="CarouselBgImages">
      {/* Le titre au milieu de la page que l'on remplacera avec une props quand on pourra avoir les données en dynamiques */}
      <h1 className="page-title">O&apos;resto</h1>
      {/* Le composant du carousel de la librairie react-responsive-carousel, on mapera pour créer les div */}
      <Carousel autoPlay infiniteLoop showThumbs={false} showIndicators={false} showArrows={false} showStatus={false}>
        <div className="carou-img" style={{ backgroundImage: `url(${img1})` }} />
        <div className="carou-img" style={{ backgroundImage: `url(${img2})` }} />
        <div className="carou-img" style={{ backgroundImage: `url(${img3})` }} />
      </Carousel>
    </div>
  );
}

export default CarouselBgImages;