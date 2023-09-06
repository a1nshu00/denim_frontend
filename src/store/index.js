import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from '@store/feature/counter'
import orderProductReducer from '@store/feature/orderProduct'
import orderProductPopupReducer from '@store/feature/productPopup'


export const store = configureStore({
    reducer: {
        orderProduct: orderProductReducer,
        orderProductPopup: orderProductPopupReducer,
    },
})