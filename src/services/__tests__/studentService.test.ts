import { IBasicStudent, IStudent } from '@/types';
import { api } from '../index';
import { StudentService } from '../studentService';

// Mock the api module
jest.mock('../index', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('StudentService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllStudents', () => {
    it('should fetch all students with default pagination', async () => {
      const mockResponse = {
        data: {
          students: [{ id: 1, name: 'John Doe' }],
          totalCount: 1,
          totalPages: 1,
        },
      };
      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await StudentService.getAllStudents();

      expect(api.get).toHaveBeenCalledWith('/students', { params: { page: 1, limit: 10 } });
      expect(result).toEqual(mockResponse.data);
    });

    it('should fetch all students with custom pagination', async () => {
      const mockResponse = {
        data: {
          students: [{ id: 1, name: 'John Doe' }],
          totalCount: 1,
          totalPages: 1,
        },
      };
      (api.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await StudentService.getAllStudents(2, 20);

      expect(api.get).toHaveBeenCalledWith('/students', { params: { page: 2, limit: 20 } });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getStudentById', () => {
    it('should fetch a student by ID', async () => {
      const mockStudent: IStudent = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        age: 20,
        grade: 'A',
        createdAt: '2023-05-01T00:00:00Z',
        updatedAt: '2023-05-01T00:00:00Z',
      };
      (api.get as jest.Mock).mockResolvedValue({ data: mockStudent });

      const result = await StudentService.getStudentById(1);

      expect(api.get).toHaveBeenCalledWith('/students/1');
      expect(result).toEqual(mockStudent);
    });
  });

  describe('createStudent', () => {
    it('should create a new student', async () => {
      const mockStudentData: IBasicStudent = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        age: 20,
        grade: 'A',
      };
      const mockResponse = {
        data: {
          message: 'Student created successfully',
          data: { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', age: 20, grade: 'A' },
        },
      };
      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await StudentService.createStudent(mockStudentData);

      expect(api.post).toHaveBeenCalledWith('/students', mockStudentData);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('updateStudent', () => {
    it('should update a student', async () => {
      const mockStudentData: IStudent = {
        id: 1,
        firstName: 'John Updated',
        createdAt: '',
        updatedAt: '',
        lastName: 'Gonzales',
        email: 'jg@gmail.com',
        age: 16,
        grade: '12no',
      };
      (api.put as jest.Mock).mockResolvedValue({ data: mockStudentData });

      const result = await StudentService.updateStudent(1, mockStudentData);

      expect(api.put).toHaveBeenCalledWith('/students/1', mockStudentData);
      expect(result).toEqual(mockStudentData);
    });
  });

  describe('deleteStudent', () => {
    it('should delete a student', async () => {
      const mockDeletedStudent: IStudent = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        age: 20,
        grade: 'A',
        createdAt: '2023-05-01T00:00:00Z',
        updatedAt: '2023-05-01T00:00:00Z',
      };
      (api.delete as jest.Mock).mockResolvedValue({ data: mockDeletedStudent });

      const result = await StudentService.deleteStudent(1);

      expect(api.delete).toHaveBeenCalledWith('/students/1');
      expect(result).toEqual(mockDeletedStudent);
    });
  });
});
