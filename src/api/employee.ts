import { Employee } from "@/interface/employee";
import axios, { AxiosResponse } from "axios";

interface EditEmployeeData {
  employeeId: number;
  name: string;
  supervisorId?: number | null;
  director: boolean;
}

export const createEmployee = async (employeeData: {
  name: string;
  supervisorId?: number | null;
  director: boolean;
}) => {
  try {
    const response: AxiosResponse<Employee> = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/employee`,
      employeeData
    );
    return response.data;
  } catch (error: any) {
    throw (
      error.message || {
        message: "An error occurred while creating the employee.",
      }
    );
  }
};

export const getAllEmployees = async () => {
  try {
    const response: AxiosResponse<Employee[]> = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/employee`
    );
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    throw (
      error.message || {
        message: "An error occurred while fetching employees.",
      }
    );
  }
};

export const getEmployeeById = async (employeeId: string) => {
  try {
    const response: AxiosResponse<Employee> = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/employee/${employeeId}`
    );
    return response.data;
  } catch (error: any) {
    throw (
      error.message || {
        message: "An error occurred while fetching the employee.",
      }
    );
  }
};

export const editEmployee = async (data: EditEmployeeData) => {
  try {
    const { employeeId, ...updatedEmployeeData } = data;
    const response: AxiosResponse<Employee> = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/employee/${employeeId}`,
      updatedEmployeeData
    );
    return response.data;
  } catch (error: any) {
    throw (
      error.message || {
        message: "An error occurred while editing the employee.",
      }
    );
  }
};
