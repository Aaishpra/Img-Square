import React, { useEffect, useState } from "react";
import styles from "./styles/Authenticate.module.css";
import LoadingSpinner from "../spinner/LoadingSpinner";
import { useToasts } from "react-toast-notifications";

const Authenticate = () => {
  const [signinState, setSigninState] = useState(true);
  const [loading, setLoading] = useState(false);

  const { addToast } = useToasts();

  useEffect(() => {
    document
      .querySelector(`.${styles.img__btn}`)
      .addEventListener("click", function () {
        document
          .querySelector(`.${styles.cont}`)
          .classList.toggle(`${styles.s__signup}`);
      });
  }, []);

  return (
    <React.Fragment>
      {loading && <LoadingSpinner asOverlay />}
      <div className={`${styles.container}`}>
        <div className={`${styles.cont}`}>
          <div className={`${styles.form} ${styles.signIn}`}>
            <h2>Welcome back,</h2>
            <label>
              <span>Email</span>
              <input type="email" />
            </label>
            <label>
              <span>Password</span>
              <input type="password" />
            </label>
            <p className={`${styles.forgotPasss}`}>Forgot password?</p>
            <button type="button" className={`${styles.submit}`}>
              Sign In
            </button>
            <button type="button" className={`${styles.fbBtn}`}>
              Connect with <span>facebook</span>
            </button>
          </div>
          <div className={`${styles.subCont}`}>
            <div className={`${styles.img}`}>
              <div className={`${styles.img__text} ${styles.m__up}`}>
                <h2>New here?</h2>
                <p>Sign up and discover great amount of new opportunities!</p>
              </div>
              <div className={`${styles.img__text} ${styles.m__in}`}>
                <h2>One of us?</h2>
                <p>
                  If you already has an account, just sign in. We've missed you!
                </p>
              </div>
              <div
                className={`${styles.img__btn}`}
                onClick={() => setSigninState(!signinState)}
              >
                <span className={`${styles.m__up}`}>Sign Up</span>
                <span className={`${styles.m__in}`}>Sign In</span>
              </div>
            </div>
            <div className={`${styles.form} ${styles.signUp}`}>
              <h2>Time to feel like home,</h2>
              <label>
                <span>Name</span>
                <input type="text" />
              </label>
              <label>
                <span>Email</span>
                <input type="email" />
              </label>
              <label>
                <span>Password</span>
                <input type="password" />
              </label>
              <button type="button" className={`${styles.submit}`}>
                Sign Up
              </button>
              <button type="button" className={`${styles.fbBtn}`}>
                Join with <span>facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Authenticate;
