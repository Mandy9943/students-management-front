'use client';

import { Button } from '@/components/Button';
import { PencilIcon, TrashIcon } from '@/components/icons';
import { useStudentContext } from '@/store/StudentContext';
import { IStudent } from '@/types';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './Table.module.scss';

const Dialog = dynamic(() => import('@/components/Modal').then(mod => mod.Dialog), {
  ssr: false,
});

const UpdateForm = dynamic(() => import('../Form/UpdateForm'), {
  ssr: false,
});

const ConfirmationDialog = dynamic(() => import('../ConfirmationDialog/ConfirmationDialog'), {
  ssr: false,
});

const Table = () => {
  const {
    students,
    loading,
    totalCount,
    totalPages,
    currentPage,
    fetchStudents,
    deleteStudent,
    selectedStudentIds,
    selectStudent,
    deselectStudent,
    toggleSelectAll,
  } = useStudentContext();

  const [limit] = useState(10);
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<IStudent | null>(null);
  const allSelected = students.length > 0 && selectedStudentIds.length === students.length;

  useEffect(() => {
    fetchStudents(currentPage, limit);
  }, [fetchStudents, currentPage, limit]);

  const handleDelete = async () => {
    if (studentToDelete) {
      const deleted = await deleteStudent(studentToDelete.id);
      if (deleted) {
        toast.success('Student deleted successfully');
        fetchStudents(currentPage, limit); // Refetch the current page
      } else {
        toast.error('Something went wrong');
      }
      setStudentToDelete(null);
      setShowConfirmDialog(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchStudents(newPage, limit);
    }
  };

  const handleClickUpdate = (student: IStudent) => {
    setSelectedStudent(student);
  };

  const handleCloseUpdate = () => {
    setSelectedStudent(null);
  };

  const handleSelectAll = () => {
    toggleSelectAll(!allSelected);
  };

  const handleSelectRow = (id: number) => {
    if (selectedStudentIds.includes(id)) {
      deselectStudent(id);
    } else {
      selectStudent(id);
    }
  };

  const confirmDelete = (student: IStudent) => {
    setStudentToDelete(student);
    setShowConfirmDialog(true);
  };

  if (loading) return <div>Loading...</div>;

  const isOpen = Boolean(selectedStudent);

  return (
    <div className={styles.table}>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th aria-label="checkbox">
                <input type="checkbox" checked={allSelected} onChange={handleSelectAll} />
              </th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, index) => (
              <tr key={student.email} className={`${index !== students.length - 1 && styles.withBorderBottom}`}>
                <td data-label="Select">
                  <input
                    type="checkbox"
                    checked={selectedStudentIds.includes(student.id)}
                    onChange={() => handleSelectRow(student.id)}
                  />
                </td>
                <td data-label="First Name">{student.firstName}</td>
                <td data-label="Last Name">{student.lastName}</td>
                <td data-label="Email">{student.email}</td>
                <td data-label="Age">{student.age}</td>
                <td data-label="Grade">{student.grade}</td>
                <td data-label="Actions" className={styles.actions}>
                  <Button onClick={() => handleClickUpdate(student)}>
                    <PencilIcon size={20} color="#ffc107" />
                  </Button>
                  <Button onClick={() => confirmDelete(student)}>
                    <TrashIcon size={14} color="#dc3545" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.paginationContainer}>
        <p>
          Showing <b>{students.length}</b> out of <b>{totalCount}</b> entries
        </p>
        <div className={styles.pagination}>
          <Button
            className={styles.prevButton}
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {[...Array(totalPages)].map((_, index) => (
            <Button
              // eslint-disable-next-line react/no-array-index-key
              key={index + 1}
              className={`${styles.pageButton} ${currentPage === index + 1 ? styles.active : ''}`}
              type="button"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            className={styles.nextButton}
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      {selectedStudent && (
        <Dialog isOpen={isOpen} onClose={handleCloseUpdate}>
          <h3 className={styles.dialogTitle}>Update Student</h3>
          <UpdateForm student={selectedStudent} callback={() => handleCloseUpdate()} />
        </Dialog>
      )}
      {showConfirmDialog && (
        <ConfirmationDialog
          isOpen={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={handleDelete}
          message={
            <span>
              Are you sure you want to delete{' '}
              <b>
                {studentToDelete?.firstName} {studentToDelete?.lastName}
              </b>{' '}
              ?
            </span>
          }
        />
      )}
    </div>
  );
};

export default Table;
