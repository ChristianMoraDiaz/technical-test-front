"use client";
import { getEmployeeById } from "@/api/employee";
import { Employee, profilePicture } from "@/interface/employee";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { toast } from "sonner";

const emptyEmployee: Employee = {
  id: 0,
  name: "",
  version: 1,
  supervisor: undefined,
  subordinates: [],
  director: false,
};

export default function Page({
  params,
}: {
  params: { employeeId: string };
}): ReactElement {
  const [employee, setEmployee] = useState<Employee>(emptyEmployee);
  const router = useRouter();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const employee = await getEmployeeById(params.employeeId);
        setEmployee(employee);
      } catch (error: any) {
        let errorMessage =
          error.message || "An error occurred while fetching the employee.";

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

    fetchEmployee();
  }, []);

  const handleEditClick = () => {
    router.push(`/employees/edit?employeeId=${params.employeeId}`);
  };
  return (
    <div className="min-h-screen items-center justify-center ">
      <div className="hero min-h-screen bg-slate-900">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={profilePicture}
            alt={`Weather: ${employee.name}`}
            width={500}
            height={400}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="ml-8 ">
            <h1 className="text-5xl font-bold">{employee.name}</h1>
            <p className="pt-6">
              {`Supervisor: ${employee.supervisor?.name ?? "Doesn't have"}`}
            </p>
            <p className="pt-1">
              {`Subordinates: ${
                employee.subordinates.length > 0
                  ? employee.subordinates
                      .map((subordinate) => subordinate.name)
                      .join(", ")
                  : "None"
              }`}
            </p>
            <p className="pt-1">{`Version: ${employee.version}`}</p>
            <p className="pt-1">{`Director: ${
              employee.director ? "Yes" : "No"
            }`}</p>
            <div className="py-6">
              <button
                className="btn btn-primary mr-7"
                onClick={handleEditClick}
              >
                Edit Employee
              </button>
              <button className="btn btn-primary">
                <Link href="/employees">Go back</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
