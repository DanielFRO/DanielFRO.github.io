$(document).ready(function () {
    // Lista de productos
    const products = [
        { id: 1, name: "iPhone 16 Pro", price: 5500000, img: "assets/img1.png" },
        { id: 2, name: "iPhone 15", price: 4500000, img: "assets/img2.png" },
        { id: 3, name: "iPhone 14", price: 3500000, img: "assets/img3.png" },
        { id: 4, name: "iPhone SE", price: 1000000, img: "assets/img4.png" },
        { id: 5, name: "iPhone 11", price: 1200000, img: "assets/img5.png" },
        { id: 6, name: "iPhone 15 Pro Max", price: 5200000, img: "assets/img6.png" },
        { id: 7, name: "iPhone 14 Pro", price: 4000000, img: "assets/img7.png" },
        { id: 8, name: "iPhone 13 Pro", price: 1500000, img: "assets/img8.png" },
        { id: 9, name: "iPhone 12", price: 1300000, img: "assets/img9.png" },
        { id: 10, name: "iPad Pro", price: 2000000, img: "assets/img10.png" }
    ];

    let cart = [];

    // Función para renderizar productos
    function renderProducts() {
        const productList = $('#product-list');
        products.forEach(product => {
            productList.append(`
                <div class="col-md-3 product">
                    <div class="card">
                        <img src="${product.img}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">Precio: $${product.price}</p>
                            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            `);
        });
    }

    // Función para renderizar el carrito
    function renderCart() {
        const cartDiv = $('#cart');
        cartDiv.empty();

        if (cart.length === 0) {
            cartDiv.append('<p>No hay productos en el carrito.</p>');
            return;
        }

        let totalPrice = 0;

        cart.forEach(item => {
            cartDiv.append(`
                <p style="color: white;">${item.name} - $${item.price} <button class="btn btn-danger btn-sm remove-from-cart" data-id="${item.id}">Eliminar</button></p>
            `);
            totalPrice += item.price;
        });

        // Descuento del 20% si hay más de 3 productos
        let discount = 0;
        if (cart.length >= 3) {
            discount = totalPrice * 0.20;
        }

        let finalPrice = totalPrice - discount;

        cartDiv.append(`<p style="color: white;">Total: $${totalPrice}</p>`);
        if (discount > 0) {
            cartDiv.append(`<p style="color: white;">Descuento: $${discount.toFixed(2)}</p>`);
        }
        cartDiv.append(`<p style="color: white;">Precio Final: $${finalPrice.toFixed(2)}</p>`);
    }

    // Agregar productos al carrito
    $('#product-list').on('click', '.add-to-cart', function () {
        const productId = $(this).data('id');
        const product = products.find(p => p.id === productId);

        cart.push(product);
        renderCart();
    });

    // Eliminar productos del carrito
    $('#cart').on('click', '.remove-from-cart', function () {
        const productId = $(this).data('id');
        cart = cart.filter(item => item.id !== productId);
        renderCart();
    });

    // Simulación de compra (generar factura)
    $('#checkout-btn').on('click', function () {
        if (cart.length === 0) {
            alert('No hay productos en el carrito');
            return;
        }

        let invoiceContent = '';
        let totalPrice = 0;

        cart.forEach(item => {
            invoiceContent += `<p>${item.name} - $${item.price}</p>`;
            totalPrice += item.price;
        });

        let discount = 0;
        if (cart.length >= 3) {
            discount = totalPrice * 0.20;
        }

        let finalPrice = totalPrice - discount;

        invoiceContent += `<p>Total: $${totalPrice}</p>`;
        if (discount > 0) {
            invoiceContent += `<p>Descuento: $${discount.toFixed(2)}</p>`;
        }
        invoiceContent += `<p>Precio Final: $${finalPrice.toFixed(2)}</p>`;
        invoiceContent += `<p>Fecha: ${new Date().toLocaleDateString()}</p>`;

        $('#invoice-content').html(invoiceContent);
        $('#invoiceModal').modal('show');
    });

    // Inicializar productos
    renderProducts();
});
