import React from 'react';
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItemFromCart } from '../redux/slices/cartSlice';

const CartModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    //const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 1; i <= fullStars; i++) {
      stars.push(
        <FontAwesome key={`full-${i}`} name="star" size={14} color="#FFD700" />
      );
    }

    

    if (halfStar) {
        stars.push(
          <FontAwesome key="half" name="star-half" size={14} color="#FFD700" />
      );
    }

    

    return stars;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Cart</Text>
          {cartItems.length === 0 ? (
            <Text style={styles.emptyCart}>Your cart is empty</Text>
          ) : (
            cartItems.map(item => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.cartItemImage} />
                <View style={styles.cartItemDetails}>
                  <Text style={styles.cartItemTitle}>{item.title}</Text>
                  <View style={styles.cartItemRating}>{renderRatingStars(item.rating.rate)}</View>
                  <Text style={styles.cartItemPrice}>${item.price}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => handleDecrement(item.id)}>
                      <FontAwesome name="minus" size={20} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => handleIncrement(item.id)}>
                      <FontAwesome name="plus" size={20} color="#000" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => handleRemove(item.id)}>
                    <FontAwesome name="trash" size={20} color="#FF0000" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemRating: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
});

export default CartModal;






