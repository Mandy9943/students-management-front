import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useStudentContext } from '@/store/StudentContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import styles from './Form.module.scss';
import { formSchema, Inputs } from './schema';

const ErrorMessage = ({ error }: { error: string }) => <span className={styles.errorMessage}>{error}</span>;

const CreateForm = () => {
  const { addStudent, loading } = useStudentContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      grade: '',
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async data => {
    const student = await addStudent({
      age: data.age,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      grade: data.grade,
    });

    if (student) {
      reset();
      toast.success('Student added successfully');
    } else {
      toast.error('Failed to add student');
    }
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div>
        <Input placeholder="First Name" {...register('firstName')} />
        {errors.firstName?.message && <ErrorMessage error={errors.firstName.message} />}
      </div>
      <div>
        <Input placeholder="Last Name" {...register('lastName')} />
        {errors.lastName?.message && <ErrorMessage error={errors.lastName.message} />}
      </div>
      <div>
        <Input placeholder="Email" {...register('email')} />
        {errors.email?.message && <ErrorMessage error={errors.email.message} />}
      </div>
      <div>
        <Input placeholder="Age" {...register('age')} />
        {errors.age?.message && <ErrorMessage error={errors.age.message as string} />}
      </div>
      <div>
        <Input placeholder="Grade" {...register('grade')} />
        {errors.grade?.message && <ErrorMessage error={errors.grade.message} />}
      </div>

      <div className={styles.formFooter}>
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default CreateForm;
