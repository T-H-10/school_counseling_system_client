export interface Student {
    id: number;
    full_name: string;
    id_number: string;
    address?: string;
    mother_name?: string;
    mother_phone?: string;
    father_name?: string;
    father_phone?: string;
    school?: number;
    created_at: string;
  }
  
  export interface StudentEvent {
    id: number;
    student: number;
    event_type: 'meeting' | 'call' | 'teacher_report' | 'other';
    title: string;
    description: string;
    date: string;
    end_date?: string;
  }
  
  export interface StudentEnrollment {
    id: number;
    student: number;
    class_level: number;
    school_year: number;
    enrollment_date: string;
    notes?: string;
  }
  
  export interface ClassSession {
    id: number;
    school_year: number;
    class_level: number;
    title: string;
    summary: string;
    date: string;
    end_date?: string;
  }
  
  export interface TimelineEvent {
    id: number;
    type: 'event' | 'enrollment';
    timestamp: string;
    data: StudentEvent | StudentEnrollment;
  }
  
  export interface DashboardStats {
    // total_students: number;
    today_sessions: number;
    recent_events: StudentEvent[];
    // statistics: {
    //   active_students: number;
    //   total_events: number;
    // };
  }
  
  export interface AuthResponse {
    refresh: string;
    access: string;
  }
  
  export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
  }
  