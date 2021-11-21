import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Input from "../common/Input";
import { signupUser } from "../services/signupService";
import { useEffect, useState } from "react";
import { useAuth, useAuthAction } from "../context/AuthProvider";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
};
const SignupForm = () => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  console.log(redirect);
  const setAuth = useAuthAction();
  const auth = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      navigate(`/${redirect}`);
    }
  }, [redirect, auth]);
  const onSubmit = async (values) => {
    try {
      const { data } = await signupUser(values);
      setAuth(data);
      setError(null);
      navigate(`/${redirect}`);
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      }
    }
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(6, "minimem character is 6"),
    email: Yup.string()
      .required("Email is required")
      .email("format is invalid"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(
        /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/,
        "format is invalid"
      ),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        `Must Contain 8 Characters,One Uppercase, One Lowercase,One Number and One Special Case Character`
      ),
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
        <Input type="text" name="name" label="Name" formik={formik} />
        <Input type="email" name="email" label="Email" formik={formik} />
        <Input
          type="tel"
          name="phoneNumber"
          label="Phone Number"
          formik={formik}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          formik={formik}
        />
        <button className="button" type="submit" disabled={!formik.isValid}>
          sing up
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <Link to={`/login?redirect=${redirect}`}>
          <p className="text-yellow-500	 font-bold">Already login ?!!</p>
        </Link>
      </form>
    </div>
  );
};

export default SignupForm;
