import React from "react";
import { useForm } from "react-hook-form";

interface EditEmployeeFormStep1Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onSubmitStep1: (values: { employeeId: string }) => void;
  initialValues: { employeeId: string };
}

const EditEmployeeFormStep1: React.FC<EditEmployeeFormStep1Props> = ({
  setStep,
  onSubmitStep1,
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const onSubmit = handleSubmit((values) => {
    onSubmitStep1(values);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-row justify-evenly items-center mb-16">
        <div className="">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Employee Id</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              {...register("employeeId", {
                required: "Please provide an employee id",
              })}
            />
            {errors.employeeId && (
              <div className="text-red-500 text-xs">
                {errors.employeeId.message}
              </div>
            )}
          </label>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center mb-16">
        <button type="submit" className="btn btn-wide btn-outline">
          Next step
        </button>
      </div>
    </form>
  );
};

export default EditEmployeeFormStep1;
