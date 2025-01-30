import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CartContext = createContext(null);
const CART_COOKIE_NAME = "user_cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState({
    package: [],
    services: [],
    template: [],
  });

  const uploadFile = (id, fileName, fileUrl, fileOrignalName) => {
    const serviceToUpdate = cart.services.find((service) => service.id === id);

    if (serviceToUpdate) {
      // Update the 'file' property of the service
      serviceToUpdate.file = {
        fileName: fileName,
        fileUrl: fileUrl,
        fileRealName: fileOrignalName,
      };

      // Update the cart state
      setCart((prevCart) => ({
        ...prevCart,
        services: [...prevCart.services],
      }));
    }
  };

  const updatePackagesQuantity = (option) => {
    const updatedCart = { ...cart }; // Create a copy of the cart object

    switch (option) {
      case "add":
        updatedCart.package[0].quantity++; // Increment quantity
        updatedCart.package[0].duration += cart.package[0].duration;
        break;

      case "min":
        if (updatedCart.package[0].quantity > 1) {
          updatedCart.package[0].quantity--; // Decrement quantity if greater than 0
          updatedCart.package[0].duration -= cart.package[0].duration;
        }
        break;

      default:
        break;
    }

    setCart(updatedCart); // Update the state with the updated cart object
  };

  const addToCart = (productName, product) => {
    if (product.price <= 0) {
      // If the product price is less than or equal to 0, it's free or not for sale
      toast.info("This product is Free.");
      return; // Exit the function early
    }
    if (productName === "template") {
      setCart((prevCart) => ({
        ...prevCart,
        template: [product],
        package: [],
        services: [],
      }));
    } else if (productName === "service") {
      const existingItem = cart.services.find((item) => item.id === product.id);

      if (!existingItem) {
        setCart((prevCart) => ({
          ...prevCart,
          services: [...prevCart.services, product],
          template: [], // Clear the template when a service is added
        }));

        toast.success("Service added to the cart!");
      } else {
        // Notify that the service is already in the cart
        toast.info("Service is already in the cart.");
      }
    } else if (productName === "package") {
      const existingItem = cart.package.find((item) => item.id === product.id);

      if (!existingItem) {
        setCart((prevCart) => ({
          ...prevCart,
          package: [product],
          template: [], // Clear the template when a service is added
        }));
        toast.success("Package added to the cart!");
      }
    }
  };

  const removeFromCart = (productName, productId) => {
    if (productName === "service") {
      setCart((prevCart) => ({
        ...prevCart,
        services: prevCart.services.filter((item) => item.id !== productId),
      }));
      toast.error("Successfully removed!");
    }

    if (productName === "package") {
      setCart((prevCart) => ({
        ...prevCart,
        package: prevCart.package.filter((item) => item.id !== productId),
      }));
      toast.error("Successfully removed!");
    }
  };

  const clearCart = () => {
    setCart({
      package: [],
      services: [],
      template: [],
    });
  };

  useEffect(() => {
    let storedCart = Cookies.get(CART_COOKIE_NAME);

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    Cookies.set(CART_COOKIE_NAME, JSON.stringify(cart), { expires: 1 });
    let storedCart = Cookies.get(CART_COOKIE_NAME);
  }, [cart]);

  return (
    <>
      <CartContext.Provider
        value={{
          cart,
          addToCart,
          removeFromCart,
          uploadFile,
          clearCart,
          updatePackagesQuantity,
        }}
      >
        {children}
      </CartContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
