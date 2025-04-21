import { db, auth } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot,
  query, 
  orderBy,
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import { ShoeModel } from '../types/shoe';

export const FirestoreService = {
  // Get shoes by brand with real-time listeners
  getNikeShoes: (callback: (shoes: ShoeModel[]) => void) => {
    const nikeRef = collection(db, 'nike_shoes');
    return onSnapshot(nikeRef, (snapshot) => {
      const shoes = snapshot.docs.map(doc => ({
        id: doc.id,  // Include document ID
        name: doc.data().name,
        detailName: doc.data().detailName,
        price: doc.data().price,
        imgAddress: doc.data().imgAddress,
        quantity: doc.data().quantity,
        availableSizes: doc.data().availableSizes,
        availableColors: doc.data().availableColors,
        selectedSize: doc.data().selectedSize,
        selectedColor: doc.data().selectedColor,
      }));
      callback(shoes);
    });
  },

  getAdidasShoes: (callback: (shoes: ShoeModel[]) => void) => {
    const adidasRef = collection(db, 'adidas_shoes');
    return onSnapshot(adidasRef, (snapshot) => {
      const shoes = snapshot.docs.map(doc => ({
        id: doc.id,  // Include document ID
        name: doc.data().name,
        detailName: doc.data().detailName,
        price: doc.data().price,
        imgAddress: doc.data().imgAddress,
        quantity: doc.data().quantity,
        availableSizes: doc.data().availableSizes,
        availableColors: doc.data().availableColors,
        selectedSize: doc.data().selectedSize,
        selectedColor: doc.data().selectedColor,
      }));
      callback(shoes);
    });
  },

  getPumaShoes: (callback: (shoes: ShoeModel[]) => void) => {
    const pumaRef = collection(db, 'puma_shoes');
    return onSnapshot(pumaRef, (snapshot) => {
      const shoes = snapshot.docs.map(doc => ({
        id: doc.id,  // Include document ID
        name: doc.data().name,
        detailName: doc.data().detailName,
        price: doc.data().price,
        imgAddress: doc.data().imgAddress,
        quantity: doc.data().quantity,
        availableSizes: doc.data().availableSizes,
        availableColors: doc.data().availableColors,
        selectedSize: doc.data().selectedSize,
        selectedColor: doc.data().selectedColor,
      }));
      callback(shoes);
    });
  },

  // Add to cart
  addToCart: async (shoe: ShoeModel) => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error('No user logged in');

    const cartRef = doc(db, 'users', userId, 'cart', shoe.name);
    await setDoc(cartRef, {
      name: shoe.name,
      detailName: shoe.detailName,
      price: shoe.price,
      imgAddress: shoe.imgAddress,
      quantity: shoe.quantity || 1,
      availableSizes: shoe.availableSizes || [],
      availableColors: shoe.availableColors || [],
      selectedSize: shoe.selectedSize || '',
      selectedColor: shoe.selectedColor || '',
      createdAt: serverTimestamp()
    });
  },

  // Remove from cart
  removeFromCart: async (shoeName: string) => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error('No user logged in');

    await deleteDoc(doc(db, 'users', userId, 'cart', shoeName));
  },

  // Get cart items
  getCartItems: (callback: (shoes: ShoeModel[]) => void) => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error('No user logged in');

    const cartRef = collection(db, 'users', userId, 'cart');
    const cartQuery = query(cartRef, orderBy('createdAt', 'desc'));
    
    return onSnapshot(cartQuery, (snapshot) => {
      const shoes = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        detailName: doc.data().detailName,
        price: doc.data().price,
        imgAddress: doc.data().imgAddress,
        quantity: doc.data().quantity,
        availableSizes: doc.data().availableSizes,
        availableColors: doc.data().availableColors,
        selectedSize: doc.data().selectedSize,
        selectedColor: doc.data().selectedColor,
      }));
      callback(shoes);
    });
  },

  // Get favorites
  getFavorites: (callback: (shoes: ShoeModel[]) => void) => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error('No user logged in');

    const favRef = collection(db, 'users', userId, 'favorites');
    const favQuery = query(favRef, orderBy('createdAt', 'desc'));
    
    return onSnapshot(favQuery, (snapshot) => {
      const shoes = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        detailName: doc.data().detailName,
        price: doc.data().price,
        imgAddress: doc.data().imgAddress,
        brand: doc.data().brand,
        quantity: doc.data().quantity,
        availableSizes: doc.data().availableSizes,
        availableColors: doc.data().availableColors,
        selectedSize: doc.data().selectedSize,
        selectedColor: doc.data().selectedColor,
      }));
      callback(shoes);
    });
  },

  // Check if a shoe is in favorites
  isInFavorites: async (shoeName: string) => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error('No user logged in');

    const favRef = doc(db, 'users', userId, 'favorites', shoeName);
    const docSnap = await getDoc(favRef);
    
    return docSnap.exists();
  },

  // Toggle favorite and return the new state
  toggleFavorite: async (shoe: ShoeModel, brand: string) => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error('No user logged in');

    const favRef = doc(db, 'users', userId, 'favorites', shoe.name);
    
    // Check if document exists
    const docSnap = await getDoc(favRef);

    if (docSnap.exists()) {
      await deleteDoc(favRef);
      return false; // Return false indicating it's no longer a favorite
    } else {
      await setDoc(favRef, {
        name: shoe.name,
        detailName: shoe.detailName,
        price: shoe.price,
        imgAddress: shoe.imgAddress,
        brand: brand,
        createdAt: serverTimestamp()
      });
      return true; // Return true indicating it's now a favorite
    }
  }
};