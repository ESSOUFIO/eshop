import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { toast } from "react-toastify";

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProducts = () => {
      setIsLoading(true);
      try {
        const dataRef = collection(db, collectionName);
        const q = query(dataRef, orderBy("createdAt", "desc"));

        onSnapshot(q, async (snapshot) => {
          const allData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(allData);
          setIsLoading(false);
        });
      } catch (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    };

    getProducts();
  }, [collectionName]);

  return { data, isLoading };
};

export default useFetchCollection;
