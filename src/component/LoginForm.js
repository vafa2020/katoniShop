import * as yup from "yup";
import { useFormik } from "formik";
import Input from "../common/Input";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { loginUser } from "../services/loginService";
import { useEffect, useState } from "react";
import { useAuth, useAuthAction } from "../context/AuthProvider";

const initialValues = {
  email: "",
  password: "",
};
const LoginForm = () => {
  const [errorlogin, setErrorlogin] = useState(null);
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get("redirect") || "";
  
  const setAuth = useAuthAction();
  const auth = useAuth();
  console.log(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      navigate(`/${redirect}`);
    }
  }, [redirect, auth]);
  const onSubmit = async (values) => {
    try {
      const { data } = await loginUser(values);
      setAuth(data);
      setErrorlogin(null);
      navigate(`/${redirect}`);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorlogin(error.response.data.message);
      }
    }
  };
  const validationSchema = yup.object({
    email: yup.string().email("email is invalid").required("email is required"),
    password: yup.string().required("password is  required"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <div className="flex justify-center items-center mt-20">
      <form className="w-96" onSubmit={formik.handleSubmit}>
        <Input type="email" name="email" label="Email" formik={formik} />
        <Input
          type="password"
          name="password"
          label="Password"
          formik={formik}
        />
        <button className="button" type="submit" disabled={!formik.isValid}>
          Login
        </button>
        {errorlogin && <p className="text-red-500">{errorlogin}</p>}
        <Link to={`/signup?redirect=${redirect}`}>
          <p className="text-yellow-500	font-bold mt-2">Are you signup ?!!</p>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
