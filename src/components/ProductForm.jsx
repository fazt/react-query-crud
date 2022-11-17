import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/productsApi";

const ProductForm = () => {
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // invalidate cache and refetch
      queryClient.invalidateQueries("products");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData);
    addProductMutation.mutate({
      ...product,
      inStock: true,
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="price">Price</label>
      <input type="number" name="price" id="price" />
      <label htmlFor="description">Description</label>
      <textarea name="description" id="description" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
