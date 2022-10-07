import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cart.slice'
import isLoadingSlice from './slices/isLoading.slice'
import productListSlice from './slices/productList.slice'
import purchasesSlice from './slices/purchases.slice'

export default configureStore({
    reducer: {
        isLoading: isLoadingSlice,
        productList: productListSlice,
        purchases: purchasesSlice,
        cart: cartSlice
    }
})
