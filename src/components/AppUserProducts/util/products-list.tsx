import type { KartProduct } from "../../../@types/product";

const ProductsList = ({ product, quantity }: KartProduct) => {
	return (
		<div className="w-full p-4 border rounded-lg shadow-md bg-gray-50">
			<div className="w-full p-4  bg-gray-50 overflow-y-auto">
				<h3 className="text-xl font-bold mb-4">Produtos Selecionados</h3>

				{product ? (
					<ul className="space-y-4">
						{product.map((product) => (
							<li key={product.id} className="flex items-center gap-4">
								<img
									src={product.imagens[0]}
									alt={product.nome}
									className="w-20 h-20 object-cover rounded-md"
								/>
								<div>
									<h4 className="font-semibold text-lg">{product.nome}</h4>
									<p className="text-sm text-gray-500">
										Valor: R${" "}
										{(
											Number(product.valorvenda) * Number(product.quantidade)
										).toFixed(2)}
									</p>
									<p className="text-sm text-gray-500">
										Quantidade: {product.quantidade}
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
				<p>Valor total:</p> <p>R$ {quantity}</p>
			</div>
		</div>
	);
};

export default ProductsList;
