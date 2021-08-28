

class Product {
    constructor( name, price, year ) {

        this.name  = name;
        this.price = price;
        this.year  = year;

    };
};

class UI {
    
    addProduct( product ) {
        const productList = document.getElementById("product-list");
        const element = document.createElement("div");

        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <span class="mx-2"><strong>Product Name</strong>: ${ product.name }</span>
                    <span class="mx-2"><strong>Product Price</strong>: ${ product.price }</span>
                    <span class="mx-2"><strong>Product Year</strong>: ${ product.year }</span>
                    <button href="#" class="mx-2 btn btn-danger" name="delete">Delete</button>
                </div>
            </div>
        `;
        productList.appendChild( element );
    };

    resetForm() {
        document.getElementById("product-form").reset();
    };

    deleteProduct( element ){
        if( element.name === 'delete' ) {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage( 'Product deleted succesfully.', 'info' );
        }
    };

    showMessage( message, cssClass ) {
        const div = document.createElement("div");
        div.className = `alert alert-${ cssClass } mt-2`

        div.appendChild(document.createTextNode( message ));

        // INSERTAR MENSAJE
        const container = document.querySelector(".container");
        const app = document.querySelector("#app");
        // Acá se busca insertar el mensaje arriba de la aplicación, es decir, arriba de nuestra etiqueta con el id "app" en el HTML que contiene nuestra aplicación.
        container.insertBefore( div, app );
        setTimeout(() => {
            document.querySelector(".alert").remove();
        }, 3000);
    };

};

// DOM EVENTS
document.getElementById("product-form").addEventListener('submit', (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const year = document.getElementById("year").value;

    const product = new Product( name, price, year );
    const ui = new UI();
    
    if( name === '' || price === '' ) {
        return ui.showMessage( 'Please complete fields.', 'warning' );
    } else {
        ui.addProduct( product );
        ui.resetForm();
        ui.showMessage( 'Product added succesfully.', 'success' );
    }


})

document.getElementById("product-list").addEventListener('click', (e) => {
    const iu = new UI();
    iu.deleteProduct(e.target);
})
