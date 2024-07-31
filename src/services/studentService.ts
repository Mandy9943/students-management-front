import { api } from '@/services';
import { IBasicStudent, IStudent } from '@/types';

export const StudentService = {
  // Get all students
  getAllStudents: async (
    page: number = 1,
    limit: number = 10
  ): Promise<{
    students: IStudent[];
    totalCount: number;
    totalPages: number;
  }> => {
    const response = await api.get<{
      students: IStudent[];
      totalCount: number;
      totalPages: number;
    }>(`/students`, {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  },

  // Get a single student by ID
  getStudentById: async (id: number): Promise<IStudent> => {
    const response = await api.get<IStudent>(`/students/${id}`);
    return response.data;
  },

  // Create a new student
  createStudent: async (
    studentData: IBasicStudent
  ): Promise<{
    message: string;
    data: IStudent;
  }> => {
    const response = await api.post(`/students`, studentData);
    return response.data;
  },

  // Update a student
  updateStudent: async (id: number, studentData: IStudent): Promise<IStudent> => {
    const response = await api.put<IStudent>(`/students/${id}`, studentData);
    return response.data;
  },

  // Delete a student
  deleteStudent: async (id: number): Promise<IStudent> => {
    const response = await api.delete<IStudent>(`/students/${id}`);
    return response.data;
  },
};
