import $api from '@/api/index';
import { AxiosResponse } from 'axios';

export const GROCERY_LIST_KEY = 'groceryList'

export type ProductType = {
  id: string,
  title: string,
  quantity: number
}

// imitation of server pending
function delay(t: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t)
  })
}

export const getAllProducts = async () => {
  await delay(200 + Math.floor(Math.random() * 1000))

  return $api
    .get('/posts')
    .then((res) => res.data)
}

export const addProduct = async (title: string): Promise<AxiosResponse<ProductType[]>> => {
  await delay(200 + Math.floor(Math.random() * 1000))

  return $api
    .post(`/posts`, {
      title,
      quantity: 1
    })
    .then((res) => res.data)
}


export const removeProduct = async (id: string) => {
  await delay(200 + Math.floor(Math.random() * 1000))

  return $api.delete(`/posts/${id}`)
}

type ChangeQtyType = { item: ProductType, shouldIncrease: boolean }
export const changeQty = async ({ item, shouldIncrease }: ChangeQtyType) => {
  await delay(200 + Math.floor(Math.random() * 1000))

  return $api.patch(`/posts/${item.id}`, {
    ...item,
    'quantity': shouldIncrease? item.quantity + 1 : item.quantity - 1
  })
}
