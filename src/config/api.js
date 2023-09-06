export const API_ORIGIN = 'http://127.0.0.1:9000'

const ADMIN_URLS = {
    PRODUCT: {
        GET_ALL: {
            method: 'get',
            url: '/api/v1/admin/products?pagination=[pagination]&limit=[limit]&page=[page]&variants=[variants]&category=[category]&subCategory=[subCategory]',
        },
        GET_ONE: {
            method: 'get',
            url: '/api/v1/admin/products/[id]',
        },
        CREATE: {
            method: 'post',
            url: '/api/v1/admin/products',
        },
        UPDATE: {
            method: 'put',
            url: '/api/v1/admin/products/[id]',
        },
        DELETE: {
            method: 'delete',
            url: '/api/v1/admin/products/[id]',
        },
    },
    PRODUCT_CATEGORY: {
        GET_ALL: {
            method: 'get',
            url: '/api/v1/admin/product-categories?pagination=[pagination]&limit=[limit]&page=[page]&subCategory=[subCategory]',
        },
        GET_ONE: {
            method: 'get',
            url: '/api/v1/admin/product-categories/[id]',
        },
        CREATE: {
            method: 'post',
            url: '/api/v1/admin/product-categories',
        },
        UPDATE: {
            method: 'put',
            url: '/api/v1/admin/product-categories/[id]',
        },
        DELETE: {
            method: 'delete',
            url: '/api/v1/admin/product-categories/[id]',
        },
    },
    SHOP: {
        GET_ALL: {
            method: 'get',
            url: '/api/v1/admin/shops?pagination=[pagination]&limit=[limit]&page=[page]',
        },
        GET_ONE: {
            method: 'get',
            url: '/api/v1/admin/shops/[id]',
        },
        CREATE: {
            method: 'post',
            url: '/api/v1/admin/shops',
        },
        UPDATE: {
            method: 'put',
            url: '/api/v1/admin/shops/[id]',
        },
        DELETE: {
            method: 'delete',
            url: '/api/v1/admin/shops/[id]',
        },
    },
}



const SHOP_URLS = {
    ORDER: {
        GET_ALL: {
            method: 'get',
            url: '/api/v1/shop/orders?pagination=[pagination]&limit=[limit]&page=[page]',
        },
        GET_ONE: {
            method: 'get',
            url: '/api/v1/shop/orders/[id]',
        },
        CREATE: {
            method: 'post',
            url: '/api/v1/shop/orders',
        },
        UPDATE: {
            method: 'put',
            url: '/api/v1/shop/orders/[id]',
        },
        CREATE_ORDER_TRANSACTION: {
            method: 'post',
            url: '/api/v1/shop/orders/[id]/transaction',
        },
        CONFIRM_ORDER: {
            method: 'patch',
            url: '/api/v1/shop/orders/[id]/confirm',
        },
        DELETE: {
            method: 'delete',
            url: '/api/v1/shop/orders/[id]',
        },
    },
}



export const API_URLS = {
    DASHBOARD: '/dashboard',
    AUTH: {
        LOGIN: {
            method: 'post',
            url: '/api/v1/auth/login',
        },
        CHECK: {
            method: 'post',
            url: '/api/v1/auth/check',
        },
    },
    ADMIN: ADMIN_URLS,
    SHOP: SHOP_URLS,
}
