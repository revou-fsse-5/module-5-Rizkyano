import React from "react";
import { Field, ErrorMessage } from "formik";

const Step1: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Step 1</h2>
      <div className="mb-4">
        <Field name="fullname" type="text" placeholder="Fullname" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <ErrorMessage name="fullname" component="div" className="text-red-500 text-sm mt-1" />
      </div>
      <div className="mb-4">
        <Field name="email" type="email" placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
      </div>
      <div className="mb-4">
        <Field name="date" type="date" placeholder="Date Of Birth" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <ErrorMessage name="date" component="div" className="text-red-500 text-sm mt-1" />
      </div>
    </div>
  );
};

export default Step1;
