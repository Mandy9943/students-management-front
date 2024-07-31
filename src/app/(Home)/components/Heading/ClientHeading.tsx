'use client';

import { Button } from '@/components/Button';
import { MinusCircleIcon, PlusCircleIcon } from '@/components/icons';
import { Dialog } from '@/components/Modal';
import useDisclosure from '@/hooks/useDisclosure';
import { useStudentContext } from '@/store/StudentContext';
import toast from 'react-hot-toast';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import CreateForm from '../Form/CreateForm';
import styles from './Heading.module.scss';

const ClientHeading = () => {
  const {
    isOpen: isOpenCreateStudent,
    onClose: onCloseCreateStudent,
    onOpen: onOpenCreateStudent,
  } = useDisclosure(false);
  const {
    isOpen: isOpenDeleteStudent,
    onClose: onCloseDeleteStudent,
    onOpen: onOpenDeleteStudent,
  } = useDisclosure(false);

  const { deleteSelectedStudents, selectedStudentIds } = useStudentContext();

  const handleDelete = async () => {
    if (selectedStudentIds.length > 0) {
      const deletions = await deleteSelectedStudents();
      if (deletions > 0) {
        onCloseDeleteStudent();
        toast.success('Students deleted successfully');
      } else {
        toast.error('Failed to delete students');
      }
    }
  };

  return (
    <>
      <div className={styles.mainButtons}>
        <Button className={styles.deleteButton} type="button" icon={<MinusCircleIcon />} onClick={onOpenDeleteStudent}>
          Delete
        </Button>
        <Button className={styles.newButton} type="button" icon={<PlusCircleIcon />} onClick={onOpenCreateStudent}>
          Add New Student
        </Button>
      </div>
      <Dialog isOpen={isOpenCreateStudent} onClose={onCloseCreateStudent}>
        <h3 className={styles.dialogTitle}>New Student</h3>

        <CreateForm />
      </Dialog>

      {isOpenDeleteStudent && (
        <ConfirmationDialog
          isOpen={isOpenDeleteStudent}
          onClose={onCloseDeleteStudent}
          onConfirm={handleDelete}
          message={
            <span>
              Are you sure you want to delete <b>{selectedStudentIds.length}</b> student
              {selectedStudentIds.length > 1 ? 's' : ''}?
            </span>
          }
        />
      )}
    </>
  );
};

export default ClientHeading;
