// ! importing all files in index.js

//*Layout Componnet
import Layout from "./Layout";
//* Logo
import Logo from "./Components/Symbol";
//* Container
import Container from "./Components/Container/Container";
// * Haeder and footer
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
// * Divider componnet 
import Divider from "./Components/Divider/diveder.jsx";
// * Login page and sign up page 
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
//* Home Page
import HomePage from "./pages/HomePage";
import HeroSection from "./Components/HomePageComponnets/HeroSection";
import Categories from "./Components/HomePageComponnets/Categories";
import TopRatedCategories from "./Components/HomePageComponnets/TopRated"
import AboutSection from "./Components/HomePageComponnets/About";
import TestimonialSection from "./Components/HomePageComponnets/Testimonial.jsx"
import CompanyRegistrationPage from './pages/CompanyRegisterationPage.jsx'
import BusinessAccountRegister from './pages/BusinessAccountRegister.jsx'

//* Comapny  Profile Pages 
import BackgroundDecorations from "./Components/ComapnySignupComponnets/BackgroundDecorations.jsx";
import CompanyRegistrationForm from "./Components/ComapnySignupComponnets/CompanyRegistrationFrom.jsx";
import FormInput from "./Components/ComapnySignupComponnets/FormInput.jsx";
import SocialLinks from "./Components/ComapnySignupComponnets/SocialLinks.jsx";
import CompnyProfile from "./Components/CompnyPrrofileComponnets/compnyProfile.jsx";
import ReviewSection from "./Components/CompnyPrrofileComponnets/reviewSection.jsx";
import CompanyProfilePage  from "./pages/CompanyPages/CompanyProfilePage.jsx";
import CompanyDashboard from "./pages/CompanyPages/CompanyDashboard.jsx"
import Csidebar from "./Components/ComapnyDashboard/Csidebar.jsx";
import Cprofile from "./Components/ComapnyDashboard/Cprofile.jsx";
import CompanyDocuments from "./Components/ComapnyDashboard/CoampanyDocuments.jsx";

export  {
  //! Layout.jsx
  Layout,
  //! Logo
  Logo,
  //! Container
  Container,
  //! Haeder and Footer
  Header,
  Footer,
  // ! Divider
  Divider,
  //! Signup page and login page 
  SignupPage,
  LoginPage,
  //! Home Pages
  HomePage,
  HeroSection,
  Categories,
  TopRatedCategories,
  AboutSection,
  TestimonialSection,
  //COmpanyRegisteration page
  CompanyRegistrationPage,
  //Change to businness Account Register
  BusinessAccountRegister,
  // * Comapny profiel  Pages and componnets 
  BackgroundDecorations,
  CompanyRegistrationForm,
  FormInput,
  SocialLinks,
  CompnyProfile,
  ReviewSection,
  CompanyProfilePage, 
  CompanyDashboard,
  Cprofile,
  Csidebar,
  CompanyDocuments,
};
