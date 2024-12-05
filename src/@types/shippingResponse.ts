interface AdditionalServices {
  collect: boolean;
  own_hand: boolean;
  receipt: boolean;
}

interface Company {
  id: number;
  name: string;
  picture: string;
}

interface DeliveryRange {
  max: number;
  min: number;
}

export interface ShippingItem {
  additional_services: AdditionalServices;
  company: Company;
  currency: string;
  custom_delivery_range: DeliveryRange;
  custom_delivery_time: number;
  custom_price: string;
  delivery_range: DeliveryRange;
  delivery_time: number;
  discount: string;
  id: number;
  name: string;
  packages: any[];
  price: string;
  error?: string;
}

export type ShippingResponse = ShippingItem[];

export const ShippingItemGetInStore = {
  additional_services: {
    collect: true,
    own_hand: true,
    receipt: true,
  },
  company: {
    id: 1,
    name: "Correios",
    picture:
      "https://cdn.icon-icons.com/icons2/2699/PNG/512/correios_logo_icon_168573.png",
  },
  currency: "BRL",
  custom_delivery_range: {
    max: 2,
    min: 1,
  },
  custom_delivery_time: 1,
  custom_price: "0.00",
  delivery_range: {
    max: 2,
    min: 1,
  },
  delivery_time: 1,
  discount: "0.00",
  id: 1,
  name: "Retirar na loja",
  packages: [],
  price: "0.00",
} satisfies ShippingItem;
