import React from "react";
import { Helmet } from "react-helmet";

import LoginForm from "@cmp/LoginForm";
import LOGO from "@assets/media/hara.png";
import PATHS from "@constants/PATHS";
import styles from "./index.module.scss";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>صفحه ورود</title>
      </Helmet>
      <div className={styles.login}>
        <div className="container-fluid">
          <div className={`row`}>
            <div className={`col-lg-6 align-self-center ${styles.formSection}`}>
              <div className={styles.formInner}>
                <a className={styles.logo} href={PATHS.LOGIN}>
                  <img src={LOGO} alt="logo" />
                </a>
                <div>
                  <h3>به صدای عمیق خوش آمدید!</h3>
                </div>
                <LoginForm />
              </div>
            </div>
            <div className={`col-lg-6 ${styles.noneDisplay} ${styles.bgImg}`}>
              <div className={styles.lines}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
              </div>
              <div className={styles.info}>
                <div className={styles.animatedText}>
                  <h1> هوش افزار راهبر آریامن</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
