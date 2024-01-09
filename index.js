function searchProduct(form) {
	const loaderEl = document.querySelector('.loader-container');
	loaderEl.style.display = 'inherit';

	const searchQuery = form.buscador.value;
	const searchResultsQuantityEl = document.querySelector('.search-results__quantity');
	const templateEl = document.querySelector('.template-product');

	/* Forma que se me ocurrio para eliminar los productos que se muestran en pantalla en una nueva busqueda */
	const productContainerEl = document.querySelectorAll('.product-container');
	if (productContainerEl.length > 0) productContainerEl.forEach((element) => element.remove());
	/* ##################################################################################################### */

	fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${searchQuery}`)
		.then((res) => res.json())
		.then((data) => {
			const searchResults = data.results;
			const searchResultsQuantity = searchResults.length;
			searchResultsQuantityEl.innerText = searchResultsQuantity;

			searchResults.forEach((element) => {
				const cloneTemplate = templateEl.content.cloneNode(true);

				/* Product Elements */
				const productLinkEl = cloneTemplate.querySelector('.product-permalink');
				const productImageEl = cloneTemplate.querySelector('.product__img');
				const productTitleEl = cloneTemplate.querySelector('.product__title');
				const productConditionEl = cloneTemplate.querySelector('.product__condition');
				const productStockQuantityEl = cloneTemplate.querySelector('.product__stock__quantity');
				const productPriceEl = cloneTemplate.querySelector('.product__price');
				/* ################ */

				const productLink = element.permalink;
				productLinkEl['href'] = productLink;

				const productImage = element.thumbnail;
				productImageEl['src'] = productImage;

				const productTitle = element.title;
				productTitleEl.innerText = productTitle;

				const productCondition = element.condition === 'new' ? 'Nuevo' : 'Usado';
				productConditionEl.innerText = productCondition;

				const productStockQuantity = element.available_quantity;
				productStockQuantityEl.innerText = productStockQuantity;

				const productPrice = element.price;
				productPriceEl.innerText = `$${productPrice}`;

				document.body.appendChild(cloneTemplate);
			});
			loaderEl.style.display = 'none';
		});
}

function main() {
	const formEl = document.querySelector('.header__search-form');

	formEl.addEventListener('submit', (e) => {
		e.preventDefault();
		searchProduct(e.target);
	});
}
main();
