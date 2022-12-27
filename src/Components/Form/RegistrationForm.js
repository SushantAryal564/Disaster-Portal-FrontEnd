import { useFormik } from "formik";
import { Fragment } from "react";
import * as Yup from "yup";
import { Button } from "../UI/Button";

const SignupForm = (props) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 character or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 character or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "Password is too short-should be 8 chars minimum"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  let formIsValid = true;
  if (
    formik.errors.firstName ||
    formik.touched.firstName ||
    formik.errors.lastName ||
    formik.touched.lastName ||
    formik.errors.email ||
    formik.touched.email ||
    formik.errors.password ||
    formik.touched.password ||
    formik.errors.confirmPassword ||
    formik.touched.confirmPassword
  ) {
    formIsValid = false;
  } else {
    formIsValid = true;
  }
  return (
    <Fragment>
      <div className="mt-6">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-row items-center justify-center lg:justify-start">
            <p className="text-lg mb-0 mr-4 font-bold">SIGN UP</p>
          </div>

          <div className="pt-3 mb-3">
            <label htmlFor="firstName">First Name</label>
            <input
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.errors.firstName && formik.touched.firstName ? (
              <div className="text-red-600">{formik.errors.firstName}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="lastName">Last Name</label>
            <input
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.errors.lastName && formik.touched.lastName ? (
              <div className="text-red-600">{formik.errors.lastName}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email Address</label>
            <input
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="text-red-600">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="text-red-600">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <div className="text-red-600">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
          <div className="text-center lg:text-left pb-4">
            <Button formvalid={formIsValid}>Submit</Button>
            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
              Already have an account?&nbsp;&nbsp;
              <button
                type="button"
                onClick={props.change}
                className=" text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out text-sm font-semibold mb-0 inline cursor-pointer"
              >
                {" "}
                Sign in
              </button>
            </p>
          </div>
        </form>
        <br></br>
      </div>
    </Fragment>
  );
};
export default SignupForm;
