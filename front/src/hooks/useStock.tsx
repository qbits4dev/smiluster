/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { API } from "../constants/env";
import { parseErrorMessage } from "../utils/functions";

import {
    updateStock,
    setStockList,
    updateCreateStock,
    updateEditStock,
    updateDeleteStock,
    updateProducts,
} from "../redux/features/stock/stockSlice";
export const useStock = () => {
    const dispatch = useAppDispatch();
    const stock = useAppSelector((state: any) => state.stock);
    const handleAddStock = async (stock: any) => {
        try {
            const response = await fetch(API.stock.add, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(stock),
            });
            const data = await response.json();
            if (response.ok) {
                // dispatch(addStockToList(data));
                handleGetStock();
                dispatch(updateCreateStock({ error: null }));
                return true;
            } else {
                dispatch(updateCreateStock({ error: parseErrorMessage(data.error) }));
                return false;
            }
        } catch (error) {
            dispatch(updateCreateStock({ error: parseErrorMessage(error) }));
            return false;
        }
    };
    const handleGetOneStock = async (stockID: string) => {
        try {
            const response = await fetch(API.stock.getById(stockID), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.ok) {
                // dispatch(addStockToList(data));
                // dispatch(updateStock({ error: null }));
            } else {
                // dispatch(updateStock({ error: data.error }));
            }
        } catch (error) {
            // dispatch(updateStock({ error }));
        }
    };
    const handleUpdateStock = async (newData: any, stockID: string) => {
        try {
            const response = await fetch(API.stock.update(stockID), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(newData),
            });
            const data = await response.json();
            if (response.ok) {
                handleGetStock();
                dispatch(updateEditStock({ error: null }));
                return true;
            } else {
                dispatch(updateEditStock({ error: parseErrorMessage(data.error) }));
                return false;
            }
        } catch (error) {
            dispatch(updateEditStock({ error: parseErrorMessage(error) }));
            return false;
        }
    };
    const handleDeleteStock = async (stockID: string) => {
        try {
            const response = await fetch(API.stock.delete(stockID), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                // dispatch(addStockToList(data));
                handleGetStock();
                dispatch(updateDeleteStock({ error: null }));
                return true;
            } else {
                dispatch(updateDeleteStock({ error: parseErrorMessage(data.error) }));
                return false;
            }
        } catch (error) {
            dispatch(updateDeleteStock({ error: parseErrorMessage(error) }));
            return false;
        }
    };
    const handleGetStock = async () => {
        const paramsString = Object.entries({ ...stock.filterBy })
            .filter(([, value]) => value !== undefined)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");
        let url = API.stock.get;
        if (paramsString.length > 0) {
            url += "?" + paramsString;
        }
        try {
            dispatch(updateStock({ loading: true }));
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(setStockList(data));
                dispatch(updateStock({ error: null }));
            } else {
                dispatch(updateStock({ error: parseErrorMessage(data.error) }));
            }
            dispatch(updateStock({ loading: false }));
        } catch (error) {
            dispatch(updateStock({ error: parseErrorMessage(error), loading: false }));
        }
    };
    const handleGetProducts = async () => {
        try {
            const response = await fetch(API.product.get, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(
                    updateProducts({
                        products: data.paginatedProducts,
                        error: null,
                    })
                );
            } else {
                dispatch(updateProducts({ error: parseErrorMessage(data.error) }));
            }
        } catch (error) {
            dispatch(updateProducts({ error: parseErrorMessage(error) }));
        }
    };
    const handleRemoveErrors = () => {
        dispatch(updateStock({ error: null }));
        dispatch(updateCreateStock({ error: null }));
        dispatch(updateEditStock({ error: null }));
        dispatch(updateDeleteStock({ error: null }));
    };
    const handleSetFilter = (name: any, value: any) => {
        dispatch(updateStock({ filter: { name, value } }));
    };
    const handleAddProduct = async (newProduct: any) => {
        try {
            const response = await fetch(API.product.add, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(newProduct),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(
                    updateProducts({
                        error: null,
                    })
                );
                return true;
            } else {
                dispatch(updateProducts({ error: parseErrorMessage(data.error) }));
                return false;
            }
        } catch (error) {
            dispatch(updateProducts({ error: parseErrorMessage(error) }));
            return false;
        }
    };
    const handleDeleteProduct = async (id: any) => {
        try {
            const response = await fetch(API.product.delete(id), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.ok) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
        return false;
    };
    return {
        stock,
        handleAddStock,
        handleGetOneStock,
        handleUpdateStock,
        handleDeleteStock,
        handleGetStock,
        handleRemoveErrors,
        handleSetFilter,
        handleGetProducts,
        handleAddProduct,
        handleDeleteProduct,
    };
};
