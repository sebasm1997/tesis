import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { gql, useMutation, useQuery } from '@apollo/client';
import { host } from '../../../utils/constants';

export function ViewRestaurantScreen(props) {
  const { route } = props;
  const idProduct = route.params.id;

  const GET_DOGS = gql`
    query Product {
      product(id: "${idProduct}") {
        id
        name
        description
        stock,
        img
      }
    }
  `;

  const [quantity, setQuantity] = useState('1');
  const { loading, error, data } = useQuery(GET_DOGS);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => (parseInt(prevQuantity) + 1).toString());
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = Math.max(1, parseInt(prevQuantity) - 1);
      return newQuantity.toString();
    });
  };

  return (
    <View style={styles.container}>
      {error && <Text>{error.message}</Text>}
      {loading && <Text>loading</Text>}
      {data && (
        <>
          <View style={styles.content}>
            <Image
              src={host + '/images/' + data.product.img}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{data.product.name}</Text>
              <Text style={styles.price}>Disponible {data.product.stock}</Text>
              <Text style={styles.description}>{data.product.description}</Text>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decrementQuantity} style={styles.adjustButton}>
                <Text style={styles.adjustButtonText}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.quantityInput}
                keyboardType="numeric"
                value={quantity}
                onChangeText={(text) => setQuantity(text)}
              />
              <TouchableOpacity onPress={incrementQuantity} style={styles.adjustButton}>
                <Text style={styles.adjustButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.orderButton}
              onPress={() => alert(`Ordenar ${quantity} productos`)}
            >
              <Text style={styles.orderButtonText}>Ordenar</Text>
            </TouchableOpacity>
          
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#aaa',
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#a52a2a',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  bottomContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  adjustButton: {
    backgroundColor: '#8b4513',
    borderRadius: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  adjustButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  quantityInput: {
    width: 60,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 10,
  },
  orderButton: {
    backgroundColor: '#8b4513',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 150,
    alignItems: 'center',
    marginBottom: 10, // Added margin to separate from the save button
  },
  orderButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#8b4513',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 150,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
