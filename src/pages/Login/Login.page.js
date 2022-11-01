import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { PATHS } from "../../config/routes.config";
import style from "./Login.module.scss";
import LOGO from "../../assets/media/hara.png";
import { toast } from "react-toastify";
import { IS_LOGGED_IN } from "../../config/variables.config";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const validateUsername = (value) => {
    let error;
    if (!value) {
      error = "نام کاربری وارد شده نامعتبر است.";
    }
    if (!error) {
      setUsername(value);
    } else {
      setUsername("");
    }
    return error;
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = "رمز عبور وارد شده نامعتبر است.";
    }
    if (!error) {
      setPassword(value);
    } else {
      setPassword("");
    }
    return error;
  };

  const sendRequest = (event) => {
    toast.success("ورود با موفقیت انجام شد.");
    localStorage.setItem(IS_LOGGED_IN, "true");
    navigate(PATHS.HOME);
  };

  return (
    <>
      <div className={style.login}>
        <div className="container-fluid">
          <div className={`row`}>
            <div className={`col-lg-6 align-self-center ${style.formSection}`}>
              <div className={style.formInner}>
                <a className={style.logo}>
                  <img src={LOGO} alt="logo" />
                </a>
                <div>
                  <h3>ورود به حساب کاربری</h3>
                  <Formik
                    initialValues={{
                      username: username,
                      password: password,
                    }}
                    onSubmit={sendRequest}
                  >
                    {({ errors, touched, isValidating }) => (
                      <Form>
                        <div className="row gap-2">
                          <div className="col-lg-12">
                            <div className={style.formGroup}>
                              <label htmlFor="username">
                                نام کاربری
                                <span className={style.required}>*</span>{" "}
                              </label>
                              <Field
                                type={"text"}
                                id={"username"}
                                name="username"
                                validate={validateUsername}
                                placeholder="نام کاربری خود را وارد کنید..."
                              />
                              {errors.username && touched.username && (
                                <div className={style.error}>
                                  {errors.username}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className={style.formGroup}>
                              <label htmlFor="password">
                                رمز عبور
                                <span className={style.required}>*</span>{" "}
                              </label>
                              <Field
                                type={"password"}
                                id={"password"}
                                name="password"
                                validate={validatePassword}
                                placeholder="رمز عبور خود را وارد کنید..."
                              />
                              {errors.password && touched.password && (
                                <div className={style.error}>
                                  {errors.password}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <button
                              type="submit"
                              className="btn btn-primary w-100"
                            >
                              ورود
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>

            <div className={`col-lg-6 ${style.noneDisplay} ${style.bgImg}`}>
              <div className={style.lines}>
                <div className={style.line}></div>
                <div className={style.line}></div>
                <div className={style.line}></div>
                <div className={style.line}></div>
                <div className={style.line}></div>
                <div className={style.line}></div>
              </div>
              <div className={style.info}>
                <div className={style.animatedText}>
                  <h1> هوش افزار راهبر آریامن</h1>
                </div>
                <p>
                  به منظور توسعه فناوری‌های بومی هوش مصنوعی و رقابت با شرکت‌های
                  قدر خارجی شرکت هوش افزار راهبر آریامن پا به عرصه حضور گذاشته
                  است. شرکت هوش افزار راهبر آریامن (هارا) به عنوان یک شرکت
                  دانش‌بنیان از بهمن ماه سال ۱۳۹۷ به صورت حقوقی آغاز به فعالیت
                  نموده است. هسته مرکزی شرکت، متشکل از افراد متخصص در حوزه هوش
                  مصنوعی و فناوری اطلاعات می‌باشد. ایجاد بستر هوشمند برای تمام
                  کاربردهای مورد نیاز جامعه به دلیل خلا محصولات هوشمند در بازار
                  ایران علی‌رغم نیاز جامعه و تربیت نیروی متخصص از جمله اهداف
                  پیش‌روی شرکت است.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Login };
