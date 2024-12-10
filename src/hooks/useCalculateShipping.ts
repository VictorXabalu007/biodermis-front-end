import { useState, useEffect } from "react";
//@ts-ignore
import type { ShippingResponse } from "../@types/shippingResponse";
import type { ProductResponseFromApi } from "../@types/product";

const useCalculateShipping = (
  productsData: ProductResponseFromApi[],
  zipCodeAdress: string
) => {
  const [freteCalculate, setFreteCalculate] = useState<ShippingResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const calculateShipping = async () => {
    const url =
      import.meta.env.EXPO_PUBLIC_BASE_URL_MELHOR_ENVIO ||
      "https://melhorenvio.com.br/api/v2/me/shipment/calculate";
    const token =
      import.meta.env.EXPO_PUBLIC_MELHOR_ENVIO_TOKEN ||
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOWM5YWRlZGY5ODZlZWQ2ZjA3ZTUyZTE3YTk2N2Q1MmM3ZDY2MTcwZDI3NzQ1NGVkZDdkYTNmZDgxNDZkYWQzZmNmNjUwNzRlNDUzNWNlN2QiLCJpYXQiOjE3MjE3NzMzMDguNDU0MTc4LCJuYmYiOjE3MjE3NzMzMDguNDU0MTgsImV4cCI6MTc1MzMwOTMwOC40NDAwOTMsInN1YiI6IjljOTgyNzg5LTEwNTMtNGViYy04YjE2LWJlMmQxZmIxZjIyMSIsInNjb3BlcyI6WyJzaGlwcGluZy1jYWxjdWxhdGUiXX0.BvfhCRez6NXRl_rUcpM6Zs6T1l51oVus9gQabqWQYdM2aKA0BDRRXIdiKZuuF75edWrzxFGYChxAd0eSBhRMz3i3nJ4Q7_GZ9-vBC8VnTAEZhfUw3R955qQN-uEbB8SDs1Z7i11QKOqwCiveIDhTVuhPXc-gjIZFjMjrrj5PlIsjTgn_IcXtvkenRzDu7aFxTV64KrspDByWGXvEHt-ddJV5jZ8BYh5lxO4gWYvsYvasOUc_3a3XzylS9RDWjNdPtiJUtCFv7UaEMvuTKHpT0h0vCks00E0ejnhjRmh7tpl4MAk51HaMCm7CVWyyoiS_xq_8d5hUkvfx9rDgASaAdgaWZ-UAedrfoSLVWFsukRYvW8AeXmXCqcf7HM0q7RBofEBJfjZz2b39R5FBQL1Hqhyfx_2hQ9IzkQzK5lg7c687GwO3j74RhzWLHi-bwCBMemj_uReWVor23M_RPdyV3R8UK0gth7XWvKV1T7VUc9xwunt5jZitvM9-Gn3CYfTwYEQY1V6zI3-p-KEAKKGA2lUG3ZgWatW5uXp4KfYKOgByDKRa9Qb1Cmba8yArbGPKLbAAO-9R6WcGRYFDJNSZV_Xjjv4UXWdTMzzq-CzOVIB1Y3vNzpKAybcbFJquYDY63rgnYZCNig4R9DXMazRnFDZ6O4-9uRJ0A3n2iKa0QTc";

    const products = productsData
      .filter((product) => product?.id)
      .map((product) => {
        return {
          id: product.id,
          width: parseFloat(product.largura),
          height: parseFloat(product.altura),
          length: parseFloat(product.profundidade),
          weight: parseFloat(product.peso) / 1000,
          insurance_value: parseFloat(product.valorvenda),
          quantity: 1,
        };
      });
    if (!zipCodeAdress) return;
    const body = {
      from: { postal_code: "96020360" },
      to: { postal_code: zipCodeAdress },
      products,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      setFreteCalculate(data);
    } catch (error) {
      //@ts-ignore
      setError(`Houve um problema com a operação fetch: ${error.message}`);
    }
  };
  useEffect(() => {
    if (productsData) {
      calculateShipping();
    }
  }, [zipCodeAdress]);

  return { freteCalculate, error, calculateShipping };
};

export default useCalculateShipping;
