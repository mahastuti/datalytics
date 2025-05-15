'use client'
import { userDummyData } from "@/assets/assets";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()

    const { user } = useUser()

    // Inisialisasi produk kosong karena gak mau muat data dummy produk fisik
    const [products, setProducts] = useState([])

    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(true)

    // Kalau kamu gak pakai keranjang karena bukan barang, hapus atau comment saja berikut:
    // const [cartItems, setCartItems] = useState({})

    // Hilangkan fetchProductData yang setProducts ke productsDummyData
    // Kamu bisa hapus fungsi ini jika gak perlu, atau biarkan kosong seperti ini:
    const fetchProductData = async () => {
        // Tidak melakukan apa-apa supaya products tetap kosong sampai ada addProduct()
    }

    // Fungsi menambah produk (analisis) tetap dipakai
    const addProduct = (newProduct) => {
        setProducts(prev => [...prev, newProduct]);
    }

    const fetchUserData = async () => {
        setUserData(userDummyData)
    }

    // Kalau gak pakai keranjang, hapus semua fungsi terkait cart
    // const addToCart = async (itemId) => {}
    // const updateCartQuantity = async (itemId, quantity) => {}
    // const getCartCount = () => {}
    // const getCartAmount = () => {}

    useEffect(() => {
        fetchProductData()
    }, [])

    useEffect(() => {
        fetchUserData()
    }, [])

    const value = {
        user,
        currency,
        router,
        isSeller,
        setIsSeller,
        userData,
        fetchUserData,
        products,
        fetchProductData,
        addProduct,
        // Jika kamu pakai cart, sertakan lagi di sini, kalau tidak hapus saja:
        // cartItems,
        // setCartItems,
        // addToCart,
        // updateCartQuantity,
        // getCartCount,
        // getCartAmount,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
