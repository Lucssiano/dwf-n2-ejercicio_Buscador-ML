function searchProduct(searchQuery) {
	const loaderEl = document.querySelector('.loader-container');
	loaderEl.style.display = 'inherit';

	const searchResultsQuantityEl = document.querySelector('.search-results__quantity');
	const productsContainer = document.querySelector('.results');
	const templateEl = document.getElementById('template-product');

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

				productLinkEl['href'] = element.permalink;
				productImageEl['src'] = element.thumbnail;
				productTitleEl.innerText = element.title;
				productConditionEl.innerText = element.condition === 'new' ? 'Nuevo' : 'Usado';
				productStockQuantityEl.innerText = element.available_quantity;
				productPriceEl.innerText = `$${element.price}`;

				productsContainer.appendChild(cloneTemplate);
			});
			loaderEl.style.display = 'none';
		});
}

function main() {
	const formEl = document.querySelector('.header__search-form');

	formEl.addEventListener('submit', (e) => {
		e.preventDefault();
		/* Forma que se me ocurrio para eliminar los productos que se muestran en pantalla en una nueva busqueda */
		const productContainerEl = document.querySelectorAll('.product-container');
		if (productContainerEl.length > 0) productContainerEl.forEach((element) => element.remove());
		/* ##################################################################################################### */
		searchProduct(e.target.buscador.value);
	});
}
main();
