const Input = ({ name, formik, label, type }) => {
  return (
    <>
      <div>
        <label
          className="block text-yellow-500 font-bold text-sm"
          htmlFor={name}
        >
          {label}
        </label>
        <input
          className="input"
          id={name}
          name={name}
          type={type}
          {...formik.getFieldProps(name)}
        />
      </div>
      {formik.errors[name] && formik.touched[name] && (
        <div className="text-red-500">{formik.errors[name]}</div>
      )}
    </>
  );
};

export default Input;
