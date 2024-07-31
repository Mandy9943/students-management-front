'use client';

import { StudentService } from '@/services/studentService';
import { IBasicStudent, IStudent } from '@/types';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface StudentContextType {
  students: IStudent[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  selectedStudentIds: number[];
  fetchStudents: (page?: number, limit?: number) => Promise<void>;
  addStudent: (student: IBasicStudent) => Promise<IStudent | null>;
  updateStudent: (id: number, student: IStudent) => Promise<IStudent | null>;
  deleteStudent: (id: number) => Promise<IStudent | null>;
  deleteSelectedStudents: () => Promise<number>;
  selectStudent: (id: number) => void;
  deselectStudent: (id: number) => void;
  toggleSelectAll: (selectAll: boolean) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudentContext must be used within a StudentProvider');
  }
  return context;
};

export const StudentProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);

  const fetchStudents = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const { students: data, totalCount: count, totalPages: pages } = await StudentService.getAllStudents(page, limit);
      setStudents(data);
      setTotalCount(count);
      setTotalPages(pages);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  }, []);

  const addStudent = useCallback(async (student: IBasicStudent): Promise<IStudent | null> => {
    setLoading(true);
    setError(null);

    let newStudent: IStudent | null = null;
    try {
      const { data } = await StudentService.createStudent(student);
      setStudents(prevStudents => [...prevStudents, data]);
      newStudent = data;
    } catch (err) {
      setError('Failed to add student');
    } finally {
      setLoading(false);
    }

    return newStudent;
  }, []);

  const updateStudent = useCallback(async (id: number, updatedStudent: IStudent): Promise<IStudent | null> => {
    setLoading(true);
    setError(null);

    let editedStudent: IStudent | null = null;

    try {
      const data = await StudentService.updateStudent(id, updatedStudent);
      setStudents(prevStudents => prevStudents.map(student => (student.id === id ? data : student)));
      editedStudent = data;
    } catch (err) {
      setError('Failed to update student');
    } finally {
      setLoading(false);
    }

    return editedStudent;
  }, []);

  const deleteStudent = useCallback(async (id: number): Promise<IStudent | null> => {
    setLoading(true);
    setError(null);

    let deletedStudent: IStudent | null = null;

    try {
      const data = await StudentService.deleteStudent(id);
      setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
      deletedStudent = data;
    } catch (err) {
      setError('Failed to delete student');
    } finally {
      setLoading(false);
    }

    return deletedStudent;
  }, []);

  const deleteSelectedStudents = useCallback(async (): Promise<number> => {
    setLoading(true);
    setError(null);

    let successfulDeletions = 0;
    try {
      await Promise.all(selectedStudentIds.map(id => StudentService.deleteStudent(id)));
      setStudents(prevStudents => prevStudents.filter(student => !selectedStudentIds.includes(student.id)));
      setSelectedStudentIds([]);
      successfulDeletions = selectedStudentIds.length;
    } catch (err) {
      setError('Failed to delete selected students');
    } finally {
      setLoading(false);
    }

    return successfulDeletions;
  }, [selectedStudentIds]);

  const selectStudent = useCallback((id: number) => {
    setSelectedStudentIds(prevSelected => [...prevSelected, id]);
  }, []);

  const deselectStudent = useCallback((id: number) => {
    setSelectedStudentIds(prevSelected => prevSelected.filter(selectedId => selectedId !== id));
  }, []);

  const toggleSelectAll = useCallback(
    (selectAll: boolean) => {
      if (selectAll) {
        setSelectedStudentIds(students.map(student => student.id));
      } else {
        setSelectedStudentIds([]);
      }
    },
    [students]
  );

  const value: StudentContextType = useMemo(
    () => ({
      students,
      loading,
      error,
      totalCount,
      totalPages,
      currentPage,
      selectedStudentIds,
      fetchStudents,
      addStudent,
      updateStudent,
      deleteStudent,
      deleteSelectedStudents,
      selectStudent,
      deselectStudent,
      toggleSelectAll,
    }),
    [
      students,
      loading,
      error,
      totalCount,
      totalPages,
      currentPage,
      selectedStudentIds,
      fetchStudents,
      addStudent,
      updateStudent,
      deleteStudent,
      deleteSelectedStudents,
      selectStudent,
      deselectStudent,
      toggleSelectAll,
    ]
  );
  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
};
