import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import ProductModal from './ProductModal';
import CartModal from './CartModal';
import { addItemToCart } from '../redux/slices/cartSlice';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const renderItem = ({ item }) => {
    const stars = [];
    const fullStars = Math.floor(item.rating.rate); // Number of full stars
    const halfStar = item.rating.rate % 1 >= 0.5; // Check if there's a half star
    //const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

    // Add full stars
    for (let i = 1; i <= fullStars; i++) {
      stars.push(
        <FontAwesome key={`full-${i}`} name="star" size={14} color="#FFD700" />
      );
    }

    // Add half star if applicable
    if (halfStar) {
      stars.push(
        <FontAwesome key="half" name="star-half" size={14} color="#FFD700" />
      );
    }

    // Add empty stars
    // for (let i = 1; i <= emptyStars; i++) {
    //   stars.push(
    //     <FontAwesome key={`empty-${i}`} name="star-o" size={14} color="#CCCCCC" />
    //   );
    // }
    return (
      <TouchableOpacity onPress={() => openModal(item)} style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <View style={styles.productRating}>{stars}</View>
          <Text style={styles.productPrice}>${item.price}</Text>
          <Text style={styles.productCategory}>{item.category}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const addToCart = () => {
    if (selectedProduct) {
      dispatch(addItemToCart(selectedProduct));
      closeModal();
    }
  };

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Shopping</Text>
        <TouchableOpacity onPress={toggleCart} style={styles.cartIconContainer}>
          <FontAwesome name="shopping-cart" size={24} color="#fff" />
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      {selectedProduct && (
        <ProductModal
          visible={modalVisible}
          product={selectedProduct}
          onClose={closeModal}
          onAddToCart={addToCart}
        />
      )}
      {cartVisible && (
        <CartModal
          visible={cartVisible}
          onClose={toggleCart}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#007BFF',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  cartIconContainer: {
    position: 'absolute',
    right: 15,
  },
  cartBadge: {
    position: 'absolute',
    right: -10,
    top: -10,
    backgroundColor: '#FF0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productRating: {
    flexDirection: 'row',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  productCategory: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
});


export default HomeScreen;
