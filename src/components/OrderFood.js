import { useState } from "react";
import styles from "../styles/foodSingle.module.scss";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToBasket } from "../redux-data/actions/shopBasketActions";
function OrderFood({ price, title, id , isAvailable }) {
  const mode = useSelector((state) => state.theme.mode);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  return (
    <div
      className={`${styles.orderFood} ${
        mode === "light" ? "bg-light" : "bg-dark"
      } border`}
    >
      <div className={`${styles.counter}`}>
        <button
          type="button"
          onClick={(e) => {
            count < 20 ? setCount(count + 1) : e.preventDefault();
          }}
        >
          <FaPlus />
        </button>
        <span>{count}</span>
        <button
          type="button"
          onClick={(e) => {
            count > 1 ? setCount(count - 1) : e.preventDefault();
          }}
        >
          <FaMinus />
        </button>
      </div>
      <div className={styles.price}>
        <span>{(count * price).toLocaleString()} تومان</span>
      </div>
      <div className={styles.button}>
        <button
          type="button"
          className="btn btn-info"
          onClick={() => isAvailable && dispatch(addToBasket(id, price, title, count))}
          disabled={!isAvailable}
        >
          {isAvailable ? 'ثبت سفارش' : 'ناموجود'}
        </button>
      </div>
    </div>
  );
}

export default OrderFood;
