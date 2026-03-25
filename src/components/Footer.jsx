function Footer() {
  return (
    <footer id="footer" className="bg-dark text-light pt-4 mt-5">
      <div className="container">
        <div className="row">

          <div className="col-md-4 mb-4">
            <h5>Nosotros</h5>
            <p>
              Somos una empresa dedicada a ofrecer soluciones.
              Nuestro objetivo es brindar servicios de calidad a nuestros clientes.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5>Redes Sociales</h5>
            <a href="#" className="text-light me-3 fs-4"><i className="bi bi-facebook"></i></a>
            <a href="#" className="text-light me-3 fs-4"><i className="bi bi-instagram"></i></a>
            <a href="#" className="text-light me-3 fs-4"><i className="bi bi-twitter-x"></i></a>
            <a href="#" className="text-light fs-4"><i className="bi bi-linkedin"></i></a>
          </div>

          <div className="col-md-4 mb-4">
            <h5>Contáctanos</h5>
            <p className="mb-1"><i className="bi bi-geo-alt"></i> La Florida #3423 Santiago, Chile.</p>
            <p className="mb-1"><i className="bi bi-telephone"></i> +56 9 3324 5458</p>
            <p className="mb-0"><i className="bi bi-envelope"></i> workbetter@workhub.com</p>
          </div>

        </div>
      </div>
      <div className="text-center py-3 border-top border-secondary">
        © 2026 Todos los derechos reservados
      </div>
    </footer>
  );
}

export default Footer;
