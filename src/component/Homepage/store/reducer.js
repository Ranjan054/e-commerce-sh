import { updateObject } from "../../../utility";
import { GET_PRODUCT_LIST_LOADING, GET_PRODUCT_LIST_SUCCESS, GET_PRODUCT_LIST_ERROR, GET_CATEGORY_LIST_LOADING, GET_CATEGORY_LIST_SUCCESS, GET_CATEGORY_LIST_ERROR, ADD_SEARCH_QUERY, ADD_PRODUCT_TO_CART, INCREASE_PRODUCT, DECREASE_PRODUCT, DELETE_PRODUCT } from './actionTypes'
import { apiState } from "../../../constant";

const { INIT, LOADING, SUCCESS, ERROR } = apiState;

const initialState = {
    productListState: INIT,
    productList: [],
    productListError: null,

    categoryListState: INIT,
    categoryList: [],
    categoryListError: null,

    searchQuery: '',

    cartProduct: []
};

const getProductListLoading = (state) => updateObject(state, {
    productListState: LOADING,
});

const getProductListSuccess = (state, action) => updateObject(state, {
    productListState: SUCCESS,
    productList: action.data,
});

const getProductListError = (state, action) => updateObject(state, {
    productListState: ERROR,
    productListError: action.error,
});

const getCategoryListLoading = (state) => updateObject(state, {
    categoryListState: LOADING,
});

const getCategoryListSuccess = (state, action) => updateObject(state, {
    categoryListState: SUCCESS,
    categoryList: action.data,
});

const getCategoryListError = (state, action) => updateObject(state, {
    categoryListState: ERROR,
    categoryListError: action.error,
});

const addSearchQuery = (state, action) => updateObject(state, {
    searchQuery: action.data
})


const addProductToCart = (state, action) => {
    const product = action.data;
    const existingProduct = state.cartProduct.find(item => item.id === product.id);

    if (existingProduct) {
        return updateObject(state, {
            cartProduct: state.cartProduct.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item?.quantity + 1 }
                    : item
            )
        })
    } else {
        return updateObject(state, {
            cartProduct: [...state.cartProduct, { ...product, quantity: 1 }]
        })
    }
}

const increaseProduct = (state, action) => {
    return updateObject(state, {
        cartProduct: state.cartProduct.map(item =>
            item.id === action.data
                ? { ...item, quantity: item.quantity + 1 }
                : item
        )
    })
}

const decreaseProduct = (state, action) => {
    return updateObject(state, {
        cartProduct: state.cartProduct.map(item =>
            item.id === action.data && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        ).filter(item => item.quantity > 0)
    })
}

const deleteProduct = (state, action) => {
    return updateObject(state, {
        cartProduct: state.cartProduct.filter(item => item.id !== action.data)
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_PRODUCT_LIST_LOADING: return getProductListLoading(state, action);
        case GET_PRODUCT_LIST_SUCCESS: return getProductListSuccess(state, action);
        case GET_PRODUCT_LIST_ERROR: return getProductListError(state, action);

        case GET_CATEGORY_LIST_LOADING: return getCategoryListLoading(state, action);
        case GET_CATEGORY_LIST_SUCCESS: return getCategoryListSuccess(state, action);
        case GET_CATEGORY_LIST_ERROR: return getCategoryListError(state, action);

        case ADD_SEARCH_QUERY: return addSearchQuery(state, action);

        case ADD_PRODUCT_TO_CART: return addProductToCart(state, action);
        case INCREASE_PRODUCT: return increaseProduct(state, action);
        case DECREASE_PRODUCT: return decreaseProduct(state, action);
        case DELETE_PRODUCT: return deleteProduct(state, action);

        default: return state;
    }
};

export default reducer;