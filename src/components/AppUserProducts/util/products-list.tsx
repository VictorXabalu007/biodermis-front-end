import type { ProductResponseFromApi } from "../../../@types/product";

interface ProductsListProps {
	products: ProductResponseFromApi[];
	total: string;
	valores: number[];
}

const ProductsList = ({ products = [], total, valores }: ProductsListProps) => {
	return (
		<div className="w-full p-4 border rounded-lg shadow-md bg-gray-50">
			<div className="w-full p-4 bg-gray-50 overflow-y-auto">
				<h3 className="text-xl font-bold mb-4">Produtos Selecionados</h3>

				{products.length > 0 ? (
					<ul className="space-y-4">
						{products.map((product, index) => (
							<li
								key={product.id}
								className="flex flex-col md:flex-row items-center gap-4"
							>
								<img
									src={
										product.imagens && product.imagens.length > 0
											? product.imagens[0]
											: "/default.png"
									}
									alt={product.nome}
									className="w-20 h-20 object-cover rounded-md"
								/>
								<div>
									<h4 className="font-semibold text-lg">{product.nome}</h4>
									<p className="text-sm text-gray-500">
										Valor: R${" "}
										{((valores[index] || 0) * Number(product.quantity)).toFixed(
											2,
										)}
									</p>
									<p className="text-sm text-gray-500">
										Quantidade: {product.quantity}
									</p>
								</div>
							</li>
						))}
					</ul>
				) : (
					<p className="text-gray-500">Nenhum produto selecionado.</p>
				)}
			</div>
			<div className="flex gap-2 border-black border-t-2 p-2">
				<p>Valor total:</p> <p>R$ {total}</p>
			</div>
		</div>
	);
};

export default ProductsList;
