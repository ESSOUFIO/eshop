import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinnerImg from "../../asset/spinner.jpg";
import styles from "./OrderDetails.module.scss";

const OrderDetails = () => {
  const { id } = useParams();
  const order = useFetchDocument("orders", id);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Order Details</h2>
        <div>
          <Link to="/order-history">&larr; Back to Orders</Link>
        </div>
        <br />
        {order.document === null ? (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <img src={spinnerImg} alt="Loading.." style={{ width: "80px" }} />
          </div>
        ) : (
          <>
            <p>
              <b>Order ID: </b>
              {order.document.id}
            </p>
            <p>
              <b>Order Amount: </b>${order.document.orderAmount}
            </p>
            <p>
              <b>Order Status: </b>
              {order.document.orderStatus}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.document.cardItems.map((item, index) => {
                  const { id, name, price, imageURL, cartQuantity } = item;
                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>
                        <b>${price}</b>
                      </td>
                      <td>
                        <b>{cartQuantity}</b>
                      </td>
                      <td>
                        <b>${(price * cartQuantity).toFixed(2)}</b>
                      </td>
                      <td className={styles.icons}>
                        <button className="--btn --btn-primary">
                          <Link to={`/review-product/${id}`}>
                            Review Product
                          </Link>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
