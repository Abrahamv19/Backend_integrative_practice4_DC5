form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      const responseData = await response.json();
      console.log('Producto creado:', responseData);
      window.location.href = '/realtimeproducts';
    } else {
      console.error('Error al crear el producto:', response.statusText);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
});
async function deleteProduct(productId) {
  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      window.location.href = '/realtimeproducts';
    } else {
      const responseData = await response.json();
      console.error('Error deleting product:', responseData.msg);
    }
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}
