"use client";
import { getAllEmployees } from "@/api/employee";
import { Employee } from "@/interface/employee";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page(): ReactElement {
  const [allemployees, setAllEmployees] = useState<Employee[]>([]);

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

  return (
    <div className="min-h-screen items-center justify-center p-10 ">
      <h1 className="pb-8">
        Here lies all the diary employees that have been store since the
        begining of times
      </h1>
      <div className="overflow-x-auto flex float-none">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Supervisor</th>
              <th>Subordinates</th>
              <th>Version</th>
              <th>Director</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allemployees.map((employee) => (
              <tr key={employee.id}>
                <td className="ml-20">{employee.id}</td>
                <td>{employee.name}</td>
                <td>
                  {employee.supervisor ? employee.supervisor.name : " - "}
                </td>
                <td>
                  {employee.subordinates.length > 0
                    ? employee.subordinates.map((subordinate, index) => (
                        <span key={subordinate.id}>
                          {subordinate.name}
                          {index !== employee.subordinates.length - 1 && ", "}
                        </span>
                      ))
                    : " -"}
                </td>
                <td>{employee.version}</td>
                <td>{employee.director ? "Si" : "No"}</td>
                <td>
                  <button className="btn btn-xs m-1">
                    <Link href={`/employees/${employee.id}`}>Details</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
