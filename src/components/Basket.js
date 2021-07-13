import { useSelector, useDispatch } from "react-redux";
import { MdShoppingCart, MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";
import styles from "../styles/basket.module.scss";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import {
  deleteFromBasket,
  deleteBasket,
} from "../redux-data/actions/shopBasketActions";
function Basket() {
  const basket = useSelector((state) => state.basket);
  const mode = useSelector((state) => state.theme.mode);
  const address = useSelector((state) => state.address);
  const [show, setShow] = useState(false);
  const overlayRef = useRef(null);
  const basketRef = useRef(null);
  const dispatch = useDispatch();

  let finalPrice = 0;
  const clickHandler = () => {
    dispatch(deleteBasket());
    alert(
      `سفارش شما به مبلغ کل ${finalPrice.toLocaleString()} ثبت شد و تا دقایقی دیگر به آدرس ${address.city} ، خیابان ${address.road} تحویل داده میشود`
    );
  };
  basket.forEach((item) => (finalPrice += item.price * item.count));
  if (show) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "visible";
  }
  return (
    <>
      <button
        className={styles.basket}
        type="button"
        onClick={() => setShow(!show)}
      >
        <i className={`${styles.basketIcon} ${basket.length && styles.active}`}>
          <IconContext.Provider value={{ color: "#ffffff", size: "30px" }}>
            <MdShoppingCart />
          </IconContext.Provider>
        </i>
      </button>

      <CSSTransition
        nodeRef={overlayRef}
        timeout={300}
        classNames="overlay"
        in={show}
        unmountOnExit
        onEnter={() => setShow(true)}
        onExited={() => setShow(false)}
      >
        <div
          ref={overlayRef}
          className={styles.overlay}
          onClick={() => setShow(!show)}
        ></div>
      </CSSTransition>
      <CSSTransition
        nodeRef={basketRef}
        timeout={300}
        classNames="overlay"
        in={show}
        unmountOnExit
        onEnter={() => setShow(true)}
        onExited={() => setShow(false)}
      >
        <div
          className={`${styles.basketBox} ${
            mode === "dark" && styles.dark
          } shadow`}
          ref={basketRef}
        >
          <div className={styles.title}>
            <h3>سبد خرید </h3>
          </div>
          <div className={styles.items}>
            {!basket.length ? (
              <div className={styles.emptyBasket}>
                <label className="text-danger">سبد خرید شما خالی است</label>
              </div>
            ) : (
              basket.map((item, index) => (
                <div className={styles.singleItem} key={item.id} dir="rtl">
                  <button
                    type="button"
                    className={styles.delIcon}
                    onClick={() => dispatch(deleteFromBasket(index))}
                  >
                    <i>
                      <IconContext.Provider
                        value={{ color: "#ffffff", size: "26px" }}
                      >
                        <MdDelete />
                      </IconContext.Provider>
                    </i>
                  </button>
                  <div className={styles.foodInfo}>
                    <Link
                      to={`/foods/${item.id}`}
                      onClick={() => setShow(!show)}
                    >
                      {item.title}
                    </Link>

                    <span>قیمت واحد : {item.price.toLocaleString()}</span>
                  </div>
                  <div className={styles.foodCount}>
                    <span>تعداد : {item.count}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          {finalPrice > 0 && (
            <div className=" mb-2">
              <label>قیمت نهایی : {finalPrice.toLocaleString()}</label>
            </div>
          )}

          <div className={styles.payBtn}>
            <button
              type="button"
              className="btn btn-warning"
              onClick={clickHandler}
              disabled={!basket.length}
            >
              تسویه حساب
            </button>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}

export default React.memo(Basket);
