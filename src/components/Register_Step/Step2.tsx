import React from "react";
import { Field, ErrorMessage } from "formik";

const Step2: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Step 2</h2>
      <div className="mb-4">
        <Field name="username" type="text" placeholder="Username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
      </div>
      <div className="mb-4">
        <Field name="password" type="password" placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
      </div>
    </div>
  );
};

export default Step2;
