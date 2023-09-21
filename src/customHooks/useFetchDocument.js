import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const useFetchDocument = (collectionName, docId) => {
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const getDocument = async () => {
      const docRef = doc(db, collectionName, docId);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const obj = {
          id: docId,
          ...docSnap.data(),
        };
        setDocument(obj);
      } else {
        toast.error("Document not found.");
      }
    };

    getDocument();
  }, [collectionName, docId]);

  return { document };
};

export default useFetchDocument;
