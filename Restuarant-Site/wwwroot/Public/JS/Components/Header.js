class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="Header">
        <div class="Container-Header">
            <img class="Container-Image" src="../Public/Assets/Images/spaghetti-meatballs.jpg" alt="Pasta Dish">
            <div class="Centered-Text">Gusto d'italia!</div>
        </div>
    </div>
          `
    }
}


customElements.define('component-header', Header);