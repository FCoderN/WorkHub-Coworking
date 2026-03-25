//import Header from "./Components/Header";
import Espacios from "./Components/Espacios";
import Navbar from "./Components/Navbar";
import FormReserva from "./Components/FormReserva";
import Servicios from "./Components/Servicios";
import Hero from "./Components/Hero";
import Toast from "./Components/Toast";
import ListaReserva from "./Components/ListaReserva";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Navbar />
      
      <Hero />
      <Espacios />
      <FormReserva />
      <ListaReserva />
      <Servicios />
      <Toast />
      <Footer />
    </>
  )};

export default App;