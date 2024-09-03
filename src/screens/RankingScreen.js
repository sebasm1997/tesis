import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export function ListadoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Órdenes</Text>
      <View style={styles.orderContainer}>
        <Text style={styles.orderNumber}>Orden #3</Text>
        <Text style={styles.status}>Completado</Text>
        <Text style={styles.date}>28-07-2024</Text>
      </View>
      <View style={styles.orderContainer}>
        <Text style={styles.orderNumber}>Orden #2</Text>
        <Text style={styles.status}>Completado</Text>
        <Text style={styles.date}>24-07-2024</Text>
      </View>
      <View style={styles.orderContainer}>
        <Text style={styles.orderNumber}>Orden #1</Text>
        <Text style={styles.status}>Completado</Text>
        <Text style={styles.date}>23-07-2024</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textTransform: 'uppercase',
  },
  orderContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: 300,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderNumber: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  date: {
    textAlign: 'right',
    fontSize: 14,
    color: '#777',
  },
});

export default ListadoScreen;