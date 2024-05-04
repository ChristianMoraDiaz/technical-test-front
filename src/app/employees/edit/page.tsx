"use client";
import { editEmployee, getEmployeeById } from "@/api/employee";
import EditEmployeeFormStep1 from "@/components/editEmployeeSteps/EditEmployeeFormStep1";
import EditEmployeeFormStep2 from "@/components/editEmployeeSteps/EditEmployeeFormStep2";
import { Employee } from "@/interface/employee";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { toast } from "sonner";

interface Step1Values {
  employeeId: string;
}

interface Step2Values {
  employeeId: number;
  name: string;
  supervisorId: string;
  director: string;
}

export default function EditPage(): ReactElement {
  const router = useRouter();
  const { replace } = useRouter();
  const [step, setStep] = useState(0);
  const [alert, setAlert] = useState<{
    type: "info" | "success" | "error" | "warning";
    msg: string;
    error?: string;
  } | null>(null);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const employeeId = searchParams.get("employeeId");

  const [initialValuesStep1, setInitialValuesStep1] = useState({
    employeeId: employeeId || "",
  });

  const [initialValuesStep2, setInitialValuesStep2] = useState({
    employeeId: 0,
    name: "",
    supervisorId: "",
    director: "",
  });

  const onSubmitStep1 = (values: Step1Values) => {
    const fetchEmployee = async () => {
      try {
        const employee: Employee = await getEmployeeById(values.employeeId);
        setInitialValuesStep2(() => ({
          name: `${employee.name}`,
          employeeId: employee.id,
          supervisorId: `${employee.supervisor?.id}`,
          director: `${employee.director}`,
        }));

        const params = new URLSearchParams(searchParams);
        params.set("employeeId", values.employeeId);
        replace(`${pathName}?${params.toString()}`);
        setStep(1);
      } catch (error: any) {
        let errorMessage =
          error.message || "An error occurred while editing the employee.";

        setAlert({
          type: "error",
          msg: errorMessage,
        });
      }
    };

    fetchEmployee();
  };

  const onSubmitStep2 = async (values: Step2Values) => {
    try {
      const employeeData = {
        employeeId: +initialValuesStep2.employeeId,
        name: values.name,
        supervisorId: values.supervisorId === "" ? null : +values?.supervisorId,
        director: values.director === "true" ? true : false,
      };

      console.log(employeeData);
      const response = await editEmployee(employeeData);

      if (response) {
        toast.success("Success", {
          style: {
            background: "#90EE90",
            border: "#90EE90",
          },
          className: "class",
          description: `Employee edited successfully!`,
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
  };

  useEffect(() => {
    if (employeeId) {
      setInitialValuesStep1({ employeeId });
    }
  }, [employeeId]);

  return (
    <div className="min-h-screen p-10 ">
      <h1 className="text-lg text-center mb-20">Edit an employee</h1>

      <h1 className="pb-8">
        Please fill all the values that you want to update.
      </h1>
      <div className="pb-8 flex items-center justify-center">
        <div>
          <ul className="steps">
            <li className="step step-primary text-xs">Id</li>
            <li className={`step ${step === 1 ? "step-primary" : ""} text-xs`}>
              Employee Info
            </li>
          </ul>
        </div>
      </div>
      {step === 0 && (
        <EditEmployeeFormStep1
          setStep={setStep}
          onSubmitStep1={onSubmitStep1}
          initialValues={initialValuesStep1}
        />
      )}
      {step === 1 && (
        <EditEmployeeFormStep2
          setStep={setStep}
          onSubmitStep2={onSubmitStep2}
          initialValues={initialValuesStep2}
        />
      )}
    </div>
  );
}
