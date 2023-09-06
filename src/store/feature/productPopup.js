import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedProducts: [],
}

export const orderProductSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        updateSelectedProducts: (state, action) => {
            state.selectedProducts = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateSelectedProducts } = orderProductSlice.actions

export default orderProductSlice.reducer