import React from 'react';
import { View, Text, Image, StyleSheet, Modal, Button } from 'react-native';

const ProductModal = ({ visible, product, onClose, onAddToCart }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={{ uri: product.image }} style={styles.modalImage} />
          <Text style={styles.modalTitle}>{product.title}</Text>
          <Text style={styles.modalDescription}>{product.description}</Text>
          <Text style={styles.modalPrice}>${product.price}</Text>

          <View style={styles.modalButtons}>
            <Button title="Add to Cart" onPress={onAddToCart} />
            <Button title="Close" onPress={onClose} />
          </View>
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
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  modalButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProductModal;
