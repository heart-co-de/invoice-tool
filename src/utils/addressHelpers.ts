export interface AdressLike {
  street: string
  zip: string
  city: string
}

export const getAddressInOneLine = (address: AdressLike) =>
  `${address.street}, ${address.zip} ${address.city}`
