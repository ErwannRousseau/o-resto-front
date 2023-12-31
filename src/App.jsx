import { Route, Routes } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

import { isUserLogged, userInfo } from './components/Recoil/Recoil';
import ImageContextProvider from './context/ImageContextProvider';
import HomePage from './HomePage/HomePage';
import ReviewPage from './ReviewPage/ReviewPage';
import ContactPage from './ContactPage/ContactPage';
import MenuCardPage from './MenuCardPage/MenuCardPage';
import LegalPage from './LegalPage/LegalPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import StickyFooter from './components/StickyFooter/StickyFooter';
import ProfilePage from './ProfilePage/ProfilePage';
import ErrorPage from './ErrorPage/ErrorPage';

export const imagesBgContext = createContext();

function App() {
  // URL of the API imported from the file .env
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Variable to set the state of userInfo and if user is logged or not (true/false)
  const setUserLogged = useSetRecoilState(isUserLogged);
  const setUserInfo = useSetRecoilState(userInfo);

  // States of thing we will need to give to others components with props
  const [histoire, setHistoire] = useState('');
  const [imagesBgCarousel, setImagesBgCarousel] = useState([]);
  // Default value used to avoid PropTypes error
  const [infos, setInfos] = useState({
    phone: '',
    address: '',
    openingLunch: '',
    openingEvening: '',
    info: '',
  });

  // With the token of the user (stocked in localStorage when he's connected) we get his informations and stocked them with setUserInfo
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const { data } = response;
      setUserInfo({
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        roles: data.roles,
        reservations: data.reservations,
      });
    } catch (error) {
      console.log('Erreur API', error);
    }
  };

  // When user open the website -> call API to fetch all we need and check if he's already connected or not
  useEffect(() => {
    const fetchInfos = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/restaurants/2`);
        setHistoire(response.data.history);
        setInfos(response.data);
        setImagesBgCarousel(response.data.images);
      } catch (error) {
        console.log('Erreur API', error);
      }
    };
    fetchInfos();

    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        setUserLogged(true);
        fetchUserInfo();
      } else {
        setUserLogged(false);
      }
    }
  }, []);

  return (
    <>
      <Navbar />
      {/* Context to give the images to the component CarouselBgImages which is in another component */}
      <ImageContextProvider imagesBgCarousel={imagesBgCarousel}>
        {/* List of the URL of the website and what is supposed to be displayed based on it */}
        <Routes>
          <Route path="/" element={<HomePage history={histoire} />} />
          <Route path="/avis" element={<ReviewPage />} />
          <Route path="/reservations-contact" element={<ContactPage />} />
          <Route path="/carte/:category?" element={<MenuCardPage />} />
          <Route path="/mentions-legales" element={<LegalPage type="mentions" />} />
          <Route path="/confidentialite" element={<LegalPage type="politique" />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ImageContextProvider>
      <Footer infos={infos} />
      <StickyFooter infos={infos} />
    </>
  );
}

export default App;
