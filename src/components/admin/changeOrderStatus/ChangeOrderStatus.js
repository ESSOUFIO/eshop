import React, { useState } from "react";
import Card from "../../card/Card";
import styles from "./ChangeOrderStatus.module.scss";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ChangeOrderStatus = ({ orderID, order }) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const editOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const docRef = doc(db, "orders", orderID);
    await updateDoc(docRef, {
      ...order,
      editedAt: Timestamp.now().toDate(),
      orderStatus: status,
    });
    setIsLoading(false);
    toast.success("Order status updated successfully");
    navigate("/admin/orders");
  };

  return (
    <>
      <Card cardClass={styles.card}>
        <h4>Update Status</h4>
        <form onSubmit={editOrder}>
          <span>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="" disabled>
                -- Select one --
              </option>
              <option value="Order Placed">Order Placed..</option>
              <option value="Processing..">Processing..</option>
              <option value="Shipped..">Shipped..</option>
              <option value="Delivered">Delivered</option>
            </select>
          </span>
          <span>
            <button
              className="--btn --btn-primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading === true ? (
                <span>Loading...</span>
              ) : (
                <span>Update Order</span>
              )}
            </button>
          </span>
        </form>
      </Card>
    </>
  );
};

export default ChangeOrderStatus;
