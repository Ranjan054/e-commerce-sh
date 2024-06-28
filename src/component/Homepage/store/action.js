import axios from "axios";
import {
  GET_PRODUCT_LIST_ERROR, GET_PRODUCT_LIST_LOADING, GET_PRODUCT_LIST_SUCCESS,
  GET_CATEGORY_LIST_LOADING, GET_CATEGORY_LIST_SUCCESS, GET_CATEGORY_LIST_ERROR,
  ADD_SEARCH_QUERY,
  ADD_PRODUCT_TO_CART,
  INCREASE_PRODUCT,
  DECREASE_PRODUCT,
  DELETE_PRODUCT
} from "./actionTypes";

export const getProductList = (params = {}) => (dispatch) => {
  dispatch({
    type: GET_PRODUCT_LIST_LOADING,
  });

  const url = `https://api.escuelajs.co/api/v1/products`;

  axios
    .get(url, { params })
    .then((response) => {
      dispatch({
        type: GET_PRODUCT_LIST_SUCCESS,
        data: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_PRODUCT_LIST_ERROR,
        error: error || 'Something went wrong please try again later',
      });
    });
};

export const getCategoryList = () => (dispatch) => {
  dispatch({
    type: GET_CATEGORY_LIST_LOADING,
  });

  const url = `https://api.escuelajs.co/api/v1/categories`;

  axios
    .get(url)
    .then((response) => {
      dispatch({
        type: GET_CATEGORY_LIST_SUCCESS,
        data: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_CATEGORY_LIST_ERROR,
        error: error || 'Something went wrong please try again later',
      });
    });
};

export const addSearchQuery = (query) => (dispatch) => {
  dispatch({
    type: ADD_SEARCH_QUERY,
    data: query
  });
};

export const addProductToCart = (product) => (dispatch) => {
  dispatch({
    type: ADD_PRODUCT_TO_CART,
    data: product
  });
};

export const increaseProduct = (productId) => {
  return {
    type: INCREASE_PRODUCT,
    data: productId
  };
};

export const decreaseProduct = (productId) => {
  return {
    type: DECREASE_PRODUCT,
    data: productId
  };
};

export const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    data: productId
  };
};