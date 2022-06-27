class Navbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
          <a class="navbar-brand" href="#">Gusto d'italia!</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                      <a class="nav-link" href="./index.html">Home</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="./menu.html">Menu</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="./booking.html">Book Table</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="./order.html">Delivery</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="./admin.html">Admin</a>
                  </li>
              </ul>
          </div>
      </div>
  </nav>
          `
    }
}


customElements.define('component-navbar', Navbar);