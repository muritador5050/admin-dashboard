'use client';
import { showToast } from '@/lib/toastService';
import { Product } from '@/lib/utils';
import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';

type NavContextType = {
  // isOpen: boolean;
  collapse: boolean;
  isWide: boolean;
  handleOpenSiderBar: () => void;
  closeSideBar: () => void;
  handleCollapse: () => void;
  toggleSiderbarWidth: () => void;
};
interface CartContextProps {
  cart: Product[];
  addToCart: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  deleteItem: (id: number) => void;
  clearCart: () => void;
}
interface DrawerContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

//Createcontext
export const NavContextProvider = createContext<NavContextType | null>(null);
export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);
const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

//Context Api
export default function NavContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [isWide, setIsWide] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);

  //Drawer
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  //toggle function
  const handleOpenSiderBar = () => {
    setIsOpen(true);
  };

  //sidebar function
  const closeSideBar = () => {
    setIsOpen(false);
  };
  //collapse function
  const handleCollapse = () => {
    setCollapse((prev) => !prev);
  };

  //toggle width
  const toggleSiderbarWidth = () => {
    setIsWide((prev) => !prev);
  };
  //addTocart function
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast({
      title: 'success',
      description: 'Successfully added to cart!',
      status: 'success',
    });
  };

  //Increase cartitem quantity
  const increaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  //Decrease cartitem quantity
  const decreaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  //Delete cartItem
  const deleteItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <NavContextProvider.Provider
      value={{
        isWide,
        // isOpen,
        handleOpenSiderBar,
        collapse,
        toggleSiderbarWidth,
        handleCollapse,
        closeSideBar,
      }}
    >
      <DrawerContext value={{ isOpen, onOpen, onClose }}>
        <CartContext
          value={{
            cart,
            addToCart,
            increaseQuantity,
            decreaseQuantity,
            deleteItem,
            clearCart,
          }}
        >
          {children}
        </CartContext>
      </DrawerContext>
    </NavContextProvider.Provider>
  );
}

export const useNav = () => {
  const context = useContext(NavContextProvider);
  if (!context) {
    throw new Error('it must be used within a Provider');
  }
  return context;
};

export const useCart = () => {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error('it must be used within a Provider');
  }
  return cart;
};

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};
