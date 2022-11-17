import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProducts, updateProduct } from "../api/productsApi";

const Products = () => {
  const {
    isLoading,
    data: products,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (data) => data.sort((a, b) => b.id - a.id),
  });
  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>{error.message}</div>;

  return products.map((product) => (
    <div key={product.id}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button
        onClick={() => {
          deleteProductMutation.mutate(product.id);
        }}
      >
        Delete
      </button>
      <input
        type="checkbox"
        checked={product.inStock}
        id={product.id}
        onChange={(e) => {
          console.log({
            ...product,
            inStock: e.target.checked,
          });
          updateProductMutation.mutate({
            ...product,
            inStock: e.target.checked,
          });
        }}
      />
      <label htmlFor={product.id}>In Stock</label>
    </div>
  ));
};

export default Products;
