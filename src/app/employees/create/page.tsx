"use client";
import { createEmployee, getAllEmployees } from "@/api/employee";
import { Employee } from "@/interface/employee";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page(): ReactElement {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [allemployees, setAllEmployees] = useState<Employee[]>([]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      const employeeData = {
        name: values.name,
        supervisorId: values.supervisorId === "" ? null : +values.supervisorId,
        director: values.director === "true",
      };

      const response = await createEmployee(employeeData);

      if (response) {
        toast.success("Success", {
          style: {
            background: "#90EE90",
            border: "#90EE90",
          },
          className: "class",
          description: `Employee ${response.id} created successfully!`,
          closeButton: true,
          duration: 2000,
        });

        setTimeout(() => {
          router.push("/employees");
        }, 700);
      }
    } catch (error: any) {
      let errorMessage =
        error.message || "An error occurred while creating the employee.";

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
  });

  useEffect(() => {
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

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-lg text-center mb-20">Create a new employee</h1>
      <form className="card-body" onSubmit={onSubmit}>
        <div className="flex flex-row justify-start items-center mb-5">
          <div className="basis-1/3">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Employee Name:</span>
              </label>
              <input
                type="text"
                placeholder="Name..."
                className="input input-bordered h-8"
                {...register("name", {
                  required: "Employee Name is required",
                })}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">{`${errors.name.message}`}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-evenly items-center mb-5">
          <div className="basis-1/2">
            <div className="form-control max-w-sm">
              <label className="label">
                <span className="label-text">Supervisor:</span>
              </label>
              <select
                className="select select-bordered w-full"
                defaultValue={""}
                {...register("supervisorId", {
                  required:
                    !director || director === "false"
                      ? "Supervisor is required"
                      : false,
                })}
              >
                <option value="">Select supervisor...</option>
                {allemployees.map((employee) => (
                  <option
                    key={employee.id}
                    value={employee.id}
                    className="my-1"
                  >
                    {employee.name}
                  </option>
                ))}
              </select>

              {errors.supervisorId && (
                <span className="text-red-500 text-xs">{`${errors.supervisorId.message}`}</span>
              )}
            </div>
          </div>
          <div className="basis-1/2">
            <div className="form-control w-full max-w-sm">
              <label className="label">
                <span className="label-text">Is Director?:</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("director", {
                  validate: (value) =>
                    (!value.supervisorId && value === "true") ||
                    "Supervisor is required for regular employees",
                })}
                defaultValue="false"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              {errors.director && (
                <span className="text-red-500 text-xs">{`${errors.director.message}`}</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-control mt-6 justify-center items-center">
          <button className="btn btn-wide btn-primary">Create Employee</button>
        </div>
      </form>
    </div>
  );
}
