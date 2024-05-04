import { getAllEmployees } from "@/api/employee";
import { Employee } from "@/interface/employee";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface editEmployeeData {
  employeeId: number;
  name: string;
  supervisorId: string;
  director: string;
}

interface EditEmployeeFormStep2Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onSubmitStep2: (values: editEmployeeData) => void;
  initialValues: editEmployeeData;
}

const EditEmployeeFormStep2: React.FC<EditEmployeeFormStep2Props> = ({
  setStep,
  onSubmitStep2,
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: initialValues,
  });
  const [allemployees, setAllEmployees] = useState<Employee[]>([]);

  const onSubmit = handleSubmit((values) => {
    onSubmitStep2(values);
  });

  useEffect(() => {
    console.log(initialValues);
    const fetchEmployees = async () => {
      try {
        const employees = await getAllEmployees();
        setAllEmployees(employees);
      } catch (error: any) {
        let errorMessage =
          error.message || "An error occurred while fetching the employees.";

        toast.error("Error", {
          style: {
            background: "#FF474D",
            border: "#FF474D",
          },
          className: "class",
          description: errorMessage,
          closeButton: true,
          duration: 2000,
        });
      }
    };

    fetchEmployees();
  }, []);

  const director = watch("director");
  const supervisorId = watch("supervisorId");

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-row justify-evenly items-center mb-5">
        <div className="basis-1/2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Select supervisor...</span>
            </div>
            <select
              className="select select-bordered w-full"
              defaultValue={initialValues.supervisorId}
              {...register("supervisorId", {
                required:
                  !director || director === "false"
                    ? "Supervisor is required"
                    : false,
              })}
            >
              <option value="">No supervisor</option>
              {allemployees.map((employee) => (
                <option key={employee.id} value={employee.id} className="my-1">
                  {employee.name}
                </option>
              ))}
            </select>
            {errors.supervisorId && (
              <span className="text-red-500 text-xs">
                {errors.supervisorId.message}
              </span>
            )}
          </label>
        </div>
        <div className="basis-1/2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Is Director?:</span>
            </div>
            <select
              className="select select-bordered w-full"
              {...register("director", {
                validate: (value) =>
                  (value === "true" && !supervisorId) ||
                  value === "false" ||
                  "Supervisor is required for regular employees",
              })}
              defaultValue="false"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.director && (
              <span className="text-red-500 text-xs">
                {errors.director.message}
              </span>
            )}
          </label>
        </div>
      </div>

      <div className="flex flex-row justify-evenly items-center mb-16 py-12 ">
        <button
          type="button"
          className="btn btn-wide btn-outline"
          onClick={() => setStep(0)}
        >
          Previous step
        </button>
        <button
          type="submit"
          className="btn btn-wide btn-primary"
          onClick={() => console.log(director, supervisorId)}
        >
          Edit Employee
        </button>
      </div>
    </form>
  );
};

export default EditEmployeeFormStep2;
