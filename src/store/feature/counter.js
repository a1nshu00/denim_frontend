import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
    data: [],
    // other: { "status": true, "message": "Products extracted successfully", "data": [{ "name": "rtfghfds", "description": "dfghfdsf", "sku": "SD234", "category": { "title": "thnew categoryle", "description": "this is nerw category catey12345", "id": "64db97e7a05f6f2fcb4b5aa2" }, "subCategory": { "title": "this is new sub subcategory", "description": "th34sub category", "id": "64db97e7a05f6f2fcb4b5aa8" }, "price": 3456, "status": true, "gID": "P152", "variants": [], "id": "64ec1fbe062d8f61b34d5107", "quantity": 0, "createdAt": "2023-08-28 04:17" }, { "name": "12345", "description": "123452", "sku": "234", "category": { "title": "thnew categoryle", "description": "this is nerw category catey12345", "id": "64db97e7a05f6f2fcb4b5aa2" }, "subCategory": { "title": "this is new sub subcategory", "description": "th34sub category", "id": "64db97e7a05f6f2fcb4b5aa8" }, "price": 199, "status": true, "gID": "P149", "variants": [{ "name": "testv", "description": "dfghfghj", "sku": "DFGH", "color": "sdfg", "size": "dfgh", "quantity": 120, "alertQuantity": 12, "price": 345, "status": true, "gID": "P150", "id": "64eb8d7acbbba52277e91809", "createdAt": "2023-08-27 17:52" }, { "name": "new varient", "description": "sdfghn", "sku": "SDF", "color": "sdfg", "size": "sdf", "quantity": 1234, "alertQuantity": 12, "price": 12, "status": false, "gID": "P151", "id": "64eb98f5cbbba52277e91842", "createdAt": "2023-08-27 18:41" }], "id": "64eb8d65cbbba52277e91803", "quantity": 1354, "createdAt": "2023-08-27 17:52" }, { "name": "this is category", "description": "this is category 32", "sku": "2345", "category": { "title": "thnew categoryle", "description": "145432345", "id": "64db97b2a05f6f2fcb4b5a98" }, "subCategory": { "title": "werty", "description": "rewertytrew", "id": "64ea00f2e5379355cf944d0b" }, "price": 199, "status": false, "gID": "P147", "variants": [{ "name": "this is new varient", "description": "des cription", "sku": "12002", "color": "RED", "size": "SLA", "quantity": 100, "alertQuantity": 10, "price": 2131, "status": true, "gID": "P148", "id": "64eb8d28cbbba52277e917f4", "createdAt": "2023-08-27 17:51" }], "id": "64eb89efcbbba52277e917af", "quantity": 100, "createdAt": "2023-08-27 17:37" }, { "name": "product 2", "description": "this is descriotopn 1", "sku": "HEHESKU", "category": { "title": "this is title updated form 234567543567543243565", "description": "th345iption34567", "id": "64da8432c149f70c8f52038f" }, "subCategory": { "title": "this is  category", "description": "this isb category", "id": "64da8432c149f70c8f520392" }, "price": 120, "status": true, "gID": "P143", "variants": [{ "name": "test varient ", "description": "this is descriptin", "sku": "234", "color": "Yellow", "size": "ML", "quantity": 12, "alertQuantity": 1, "price": 2345, "status": true, "gID": "P146", "id": "64eb315bcf031fd8a22fbd49", "createdAt": "2023-08-27 11:19" }], "id": "64eafd691fd81e89732cd760", "quantity": 12, "createdAt": "2023-08-27 07:38" }, { "name": "Tshirt", "description": "this is description 34", "sku": "TSHRT102", "category": { "title": "thnew categoryle", "description": "145432345", "id": "64db97b2a05f6f2fcb4b5a98" }, "subCategory": { "title": "this is new sub subcategory", "description": "th34sub category", "id": "64db97b2a05f6f2fcb4b5a9e" }, "price": 1200, "status": true, "gID": "P141", "variants": [{ "name": "variant 1", "description": "this is product variant ", "sku": "SKU123", "color": "test color1", "size": "test size2 12", "quantity": 120, "alertQuantity": 10, "price": 220, "status": true, "gID": "P142", "id": "64eafb4896769fca4f3f1230", "createdAt": "2023-08-27 07:29" }, { "name": "this is new varient ", "description": "this is desxripton", "sku": "SKLU22", "color": "redcolor", "size": "XL", "quantity": 10, "alertQuantity": 5, "price": 2323, "status": true, "gID": "P145", "id": "64eb07919a4d3dfe6ae596fe", "createdAt": "2023-08-27 08:21" }], "id": "64eaf6656557ad24c89ac02d", "quantity": 130, "createdAt": "2023-08-27 07:08" }] }
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
            // state.data.push(initialState.other);
        },
        decrement: (state) => {
            state.value -= 1
            // state.other = [];
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer