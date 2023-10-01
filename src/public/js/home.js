/*---------------CARROUSEL PRODUCTS HOME-----------------*/
/* document.addEventListener('DOMContentLoaded', function () {
  const carouselItems = document.querySelectorAll('.carousel-item');
  let currentIndex = 0;

  function showNextImage() {
    carouselItems[currentIndex].classList.remove('active');
    carouselItems[currentIndex].classList.add('hidden');

    currentIndex = (currentIndex + 1) % carouselItems.length;

    carouselItems[currentIndex].classList.remove('hidden');
    carouselItems[currentIndex].classList.add('active');
  }
  setInterval(showNextImage, 5000);
});
 */
/* SEARCH */
document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.trim(); // Obtén el valor del campo de búsqueda y quita los espacios en blanco

    try {
      // Realiza una solicitud GET al servidor para buscar productos por título
      const response = await fetch(`/products/search?query=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        // Aquí puedes actualizar la interfaz de usuario con los resultados de la búsqueda
        // Por ejemplo, mostrar los productos que coinciden con la búsqueda.
        console.log(data); // Muestra los resultados en la consola para fines de depuración
      } else {
        // Maneja errores de la solicitud, por ejemplo, mostrando un mensaje de error.
        console.error('Hubo un error en la solicitud.');
      }
    } catch (error) {
      console.error('Hubo un error en la solicitud.', error);
    }
  });
});
