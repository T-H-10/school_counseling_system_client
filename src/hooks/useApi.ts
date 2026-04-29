import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/api.ts';
import type { AuthResponse, ClassSession, DashboardStats, PaginatedResponse, Student, StudentEnrollment, StudentEvent } from '../types/index.ts';


// Auth Hooks
export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const { data } = await apiClient.post<AuthResponse>('/token/', credentials);
      localStorage.setItem('authToken', data.access);
      return data;
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return () => {
    localStorage.removeItem('authToken');
    queryClient.clear();
    window.location.href = '/login';
  };
};

// Dashboard Hooks
export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const { data } = await apiClient.get<DashboardStats>('/dashboard/');
      return data;
    },
  });
};

// Student Hooks
export const useStudents = (page = 1, search = '') => {
  return useQuery({
    queryKey: ['students', page, search],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedResponse<Student>>('/students/', {
        params: { page, search },
      });
      return data;
    },
  });
};

export const useStudent = (id: number | null) => {
  return useQuery({
    queryKey: ['student', id],
    queryFn: async () => {
      if (!id) return null;
      const { data } = await apiClient.get<Student>(`/students/${id}/`);
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (student: Omit<Student, 'id' | 'created_at'>) => {
      const { data } = await apiClient.post<Student>('/students/', student);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      student,
    }: {
      id: number;
      student: Partial<Student>;
    }) => {
      const { data } = await apiClient.patch<Student>(`/students/${id}/`, student);
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['student', id] });
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/students/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};

// Student Timeline Hook
export const useStudentTimeline = (studentId: number | null) => {
  return useQuery({
    queryKey: ['timeline', studentId],
    queryFn: async () => {
      if (!studentId) return null;
      const { data } = await apiClient.get(`/students/${studentId}/timeline/`);
      return data;
    },
    enabled: !!studentId,
  });
};

// Student Events Hooks
export const useStudentEvents = (studentId: number | null) => {
  return useQuery({
    queryKey: ['events', studentId],
    queryFn: async () => {
      if (!studentId) return [];
      const { data } = await apiClient.get<StudentEvent[]>('/studentEvents/', {
        params: { student: studentId },
      });
      return data;
    },
    enabled: !!studentId,
  });
};

export const useCreateStudentEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (event: Omit<StudentEvent, 'id'>) => {
      const { data } = await apiClient.post<StudentEvent>('/studentEvents/', event);
      return data;
    },
    onSuccess: (_, event) => {
      queryClient.invalidateQueries({ queryKey: ['events', event.student] });
      queryClient.invalidateQueries({ queryKey: ['timeline', event.student] });
    },
  });
};

export const useUpdateStudentEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      event,
    }: {
      id: number;
      event: Partial<StudentEvent>;
    }) => {
      const { data } = await apiClient.patch<StudentEvent>(`/studentEvents/${id}/`, event);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['events', data.student] });
      queryClient.invalidateQueries({ queryKey: ['timeline', data.student] });
    },
  });
};

// Student Enrollments Hooks
export const useStudentEnrollments = (studentId: number | null) => {
  return useQuery({
    queryKey: ['enrollments', studentId],
    queryFn: async () => {
      if (!studentId) return [];
      const { data } = await apiClient.get<StudentEnrollment[]>('/enrollments/', {
        params: { student: studentId },
      });
      return data;
    },
    enabled: !!studentId,
  });
};

// Class Sessions (Calendar) Hooks
export const useClassSessions = (startDate?: string, endDate?: string) => {
  return useQuery({
    queryKey: ['sessions', startDate, endDate],
    queryFn: async () => {
      const { data } = await apiClient.get<ClassSession[]>('/classSessions/calendar/', {
        params: { start: startDate, end: endDate },
      });
      return data;
    },
  });
};

export const useCreateClassSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (session: Omit<ClassSession, 'id'>) => {
      const { data } = await apiClient.post<ClassSession>('/classSessions/', session);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
};

export const useUpdateClassSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      session,
    }: {
      id: number;
      session: Partial<ClassSession>;
    }) => {
      const { data } = await apiClient.patch<ClassSession>(`/classSessions/${id}/`, session);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
};

export const useDeleteClassSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/classSessions/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
};
