import { useState } from "react";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase/firebase.config";

const useFetchUser = (userId, collections) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const getCollection = () => {
    setLoading(true);
    const productRef = collection(db, collections);
    const items = query(productRef, where("uid", "==", `${userId}`));

    onSnapshot(items, (snapshot) => {
      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(allProducts);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (userId) {
      getCollection();
    }
  }, [userId]);

  return {
    data,
    loading,
    getCollection,
  };
};

export default useFetchUser;
