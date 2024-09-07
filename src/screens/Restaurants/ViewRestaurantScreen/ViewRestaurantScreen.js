import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { gql, useMutation, useQuery } from '@apollo/client';
import { host } from '../../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ViewRestaurantScreen(props) {
  const { route } = props;
  const idProduct = route.params.id;

  const GET_PRODUCT = gql`
    query Product($id: ID!) {
      product(id: $id) {
        id
        name
        description
        stock
        img
        price
      }
    }
  `;

  const [quantity, setQuantity] = useState(1);
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: idProduct },
  });

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const handleOrder = async () => {
    if (data && data.product) {
      try {
        const productToSave = {
          id: idProduct,
          name:data.product.name,
          price: data.product.price,
          quantity: quantity,
        };
        
        let cart = await AsyncStorage.getItem('cart');
        if (!cart) {
          cart=[]
        } else {
         
          cart = JSON.parse(cart);
        }

        const existingProductIndex = cart.findIndex(item => item.id === idProduct);

        if (existingProductIndex !== -1) {
          cart[existingProductIndex].quantity = quantity; // Update quantity if product already in cart
        } else {
          cart.push(productToSave); // Add new product to cart
        }
       
        await AsyncStorage.setItem('cart', JSON.stringify(cart));

        console.log(cart);
        alert(`Producto guardado: ${data.product.name}`);
      } catch (e) {
        console.error('Error al guardar el producto en AsyncStorage', e);
      }
    } else {
      alert('No se pudieron obtener los detalles del producto.');
    }
  };

  return (
    <View style={styles.container}>
      {error && <Text>{error.message}</Text>}
      {loading && <Text>Loading...</Text>}
      {data && (
        <>
          <View style={styles.content}>
            <Image
              source={{ uri: `${host}/images/${data.product.img}` }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{data.product.name}</Text>
              <Text style={styles.price}>Disponible {data.product.stock}</Text>
              <Text style={styles.price}>Precio {data.product.price}</Text>
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
                value={quantity.toString()}
                onChangeText={(text) => {
                  const parsed = parseInt(text);
                  if (!isNaN(parsed)) {
                    setQuantity(parsed);
                  }
                }}
              />
              <TouchableOpacity onPress={incrementQuantity} style={styles.adjustButton}>
                <Text style={styles.adjustButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.orderButton}
              onPress={handleOrder}
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
