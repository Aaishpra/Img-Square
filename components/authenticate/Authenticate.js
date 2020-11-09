import React, { useEffect, useState } from "react";
import styles from "./styles/Authenticate.module.css";
import LoadingSpinner from "../spinner/LoadingSpinner";
import { useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";
import { createUser, loginUser } from "../../actions/user";
import { setCookie, authenticate } from "../../helpers/auth";
import { COOKIE_NAME } from "../../appConstants";

const Authenticate = () => {
  const [signinState, setSigninState] = useState(true);
  const [loading, setLoading] = useState(true);

  const { addToast } = useToasts();

  const router = useRouter();

  useEffect(() => {
    document
      .querySelector(`.${styles.img__btn}`)
      .addEventListener("click", function () {
        document
          .querySelector(`.${styles.cont}`)
          .classList.toggle(`${styles.s__signup}`);
      });

    if (authenticate(COOKIE_NAME)) {
      router.replace("/videofeed");
      setLoading(false);
    }
    setLoading(false);
  }, []);

  const resetForm = () => {
    document.getElementById("signin-email").value = "";
    document.getElementById("signin-password").value = "";
    document.getElementById("signup-name").value = "";
    document.getElementById("signup-email").value = "";
    document.getElementById("signin-password").value = "";
  };

  const signinSubmit = async () => {
    let email = document.getElementById("signin-email").value,
      password = document.getElementById("signin-password").value;
    if (!email) {
      addToast(`Email required`, {
        appearance: "error",
        autoDismiss: true,
      });
      return false;
    }
    if (!password) {
      addToast(`Password required`, {
        appearance: "error",
        autoDismiss: true,
      });
      return false;
    }
    let response;
    let data = { email, password };
    setLoading(true);
    try {
      response = await loginUser(data);
      setLoading(false);
      if (response.error) {
        addToast(`${response.error}`, {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        setCookie(COOKIE_NAME, response.token);
        addToast(`${response.message}`, {
          appearance: "success",
        });
        router.push(`/videofeed`);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      addToast(`${error.message}`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const signupSubmit = async () => {
    let name = document.getElementById("signup-name").value,
      email = document.getElementById("signup-email").value,
      password = document.getElementById("signup-password").value;

    if (!name) {
      addToast(`Name is required`, {
        appearance: "error",
        autoDismiss: true,
      });
      return false;
    }

    if (!email) {
      addToast(`We require email to register you`, {
        appearance: "error",
        autoDismiss: true,
      });
      return false;
    }
    if (!password) {
      addToast(`Password is required`, {
        appearance: "error",
        autoDismiss: true,
      });
      return false;
    }

    let response;
    let data = { name, email, password };
    setLoading(true);
    try {
      response = await createUser(data);
      setLoading(false);
      if (response.error) {
        addToast(`${response.error}`, {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        setCookie(COOKIE_NAME, response.token);
        addToast(`${response.message}`, {
          appearance: "success",
        });
        router.push(`/videofeed`);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      addToast(`${error.message}`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <React.Fragment>
      {loading && <LoadingSpinner asOverlay />}
      <div className={`${styles.container}`}>
        <div className={`${styles.cont}`}>
          <div className={`${styles.form} ${styles.signIn}`}>
            <h2>Welcome back,</h2>
            <label>
              <span>Email</span>
              <input type="email" id="signin-email" />
            </label>
            <label>
              <span>Password</span>
              <input type="password" id="signin-password" />
            </label>
            <p className={`${styles.forgotPasss}`}>Forgot password?</p>
            <button
              type="button"
              className={`${styles.submit}`}
              onClick={() => signinSubmit()}
            >
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
                onClick={() => {
                  setSigninState(!signinState);
                  resetForm();
                }}
              >
                <span className={`${styles.m__up}`}>Sign Up</span>
                <span className={`${styles.m__in}`}>Sign In</span>
              </div>
            </div>
            <div className={`${styles.form} ${styles.signUp}`}>
              <h2>Time to feel like home,</h2>
              <label>
                <span>Name</span>
                <input type="text" id="signup-name" />
              </label>
              <label>
                <span>Email</span>
                <input type="email" id="signup-email" />
              </label>
              <label>
                <span>Password</span>
                <input type="password" id="signup-password" />
              </label>
              <button
                type="button"
                className={`${styles.submit}`}
                onClick={() => signupSubmit()}
              >
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
