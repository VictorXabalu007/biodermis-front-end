const Api = {
  baseUrl: import.meta.env.VITE_API_URL || "",
  productsById: "produtos/",
  pedidoWeb: "/pedidos/web",
  pedidoWebWithProducts: "/pedidos/produtos",
  calcularFrete: "calcularfrete",
  consultorProduct: "consultor/produtos/params",
};

export default Api;

// {
// 	"consultor_id": 4,
// 	"produto_ids": [1]
// }
