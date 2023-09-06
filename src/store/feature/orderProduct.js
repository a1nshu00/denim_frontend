import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    orderProducts: [],
    totalPrice: 0,
    totalProducts: 0,
    totalQuantity: 0,
    preSelectedProductProductIds: [],
}

export const orderProductSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        resetToInitialState: (state, action) => {
            state.totalPrice     = 0;
            state.totalProducts  = 0;
            state.totalQuantity  = 0;
            state.orderProducts  = [];
            state.preSelectedProductProductIds  = [];
        },
        updateOrderProducts: (state, action) => {
            let totalPrice        = 0;
            let totalProducts     = 0;
            let totalQuantity     = 0;
            const orderProducts   = action.payload.map(function (product) {
                let price         = 0;
                let quantity      = 0;

                const variants    = product.variants.map((variant) => {
                    const variantQuantity = 1
    
                    price        += (Number(variant.price) * Number(variantQuantity));
                    quantity     += Number(variantQuantity);

                    return {...variant, quantity:variantQuantity};
                });

                if (variants.length == 0) return false;

                totalPrice       += price;
                totalQuantity    += quantity;
                totalProducts    += 1;
                return {...product, price, quantity,  variants};
            });

            state.orderProducts  = orderProducts.filter((product) => product !== false);
            state.totalPrice     = totalPrice;
            state.totalProducts  = totalProducts;
            state.totalQuantity  = totalQuantity;
        },
        removeOrderProduct: (state, action) => {
            const currentState   = current(state);
            let totalPrice       = 0;
            let totalQuantity    = 0;
            let totalProducts     = 0;
            const orderProducts  = currentState.orderProducts.map(function (product) {

                if (action.payload.variantId === false) return false;

                let price        = 0;
                let quantity     = 0;

                const variants   = product.variants.filter((variant) => {
                    const isSelectedProduct = variant.id !== action.payload.variantId
                    if (isSelectedProduct) {
                        price    += (Number(variant.price) * Number(variant.quantity));
                        quantity += Number(variant.quantity);
                    }
                    return isSelectedProduct;
                });

                totalPrice      += price;
                totalQuantity   += quantity;
                
                if (product.id !== action.payload.id) return product;
                
                if (variants.length == 0) return false;


                return {...product, price, quantity,  variants};
            });

            state.totalPrice     = totalPrice;
            state.totalQuantity  = totalQuantity;
            state.orderProducts  = orderProducts.filter((product) =>{ 
                const isSelected = product !== false;
                if(isSelected) totalProducts++;
                return isSelected
            });
            state.totalProducts  = totalProducts;
        },
        updateOrderItemQuantity: (state, action) => {
            const currentState   = current(state);
            let totalPrice       = 0;
            let totalQuantity    = 0;
            const orderProducts  = currentState.orderProducts.map(function (product) {
                if (action.payload.variantId === false) return false;

                let price        = 0;
                let quantity     = 0;

                const variants   = product.variants.map((variant) => {
                    const isSelectedProduct = variant.id === action.payload.variantId
                    const payloadQuantity   = Number(action.payload.quantity) > 0 ? action.payload.quantity : 0
                    const variantQuantity   = Number(isSelectedProduct ? payloadQuantity : variant.quantity)

                    price    += (Number(variant.price) * variantQuantity);
                    quantity += variantQuantity;
                    
                    return {...variant, quantity:variantQuantity};
                });

                totalPrice      += price;
                totalQuantity   += quantity;

                if (product.id !== action.payload.id) return product;

                if (variants.length == 0) return false;
        
                return {...product, price, quantity,  variants};
            });

            state.totalPrice     = totalPrice;
            state.totalQuantity  = totalQuantity;
            state.orderProducts  = orderProducts.filter((product) => product !== false);
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateOrderProducts, removeOrderProduct, updateOrderItemQuantity, resetToInitialState } = orderProductSlice.actions

export default orderProductSlice.reducer