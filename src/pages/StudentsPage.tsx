import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudents, useCreateStudent, useDeleteStudent } from '../hooks/useApi';
import { Plus, Trash2, Search, ChevronRight, Loader } from 'lucide-react';
import StudentModal from '../components/StudentModal';


export default function StudentsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useStudents(page, search);
  const createMutation = useCreateStudent();
  const deleteMutation = useDeleteStudent();

  const handleCreateStudent = async (studentData: any) => {
    try {
      await createMutation.mutateAsync(studentData);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const handleDeleteStudent = async (id: number) => {
    if (confirm('האם אתה בטוח שברצונך למחוק סטודנט זה?')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">סטודנטים</h1>
          <p className="text-muted-foreground mt-2">ניהול כל הסטודנטים שלך</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors w-fit"
        >
          <Plus size={18} />
          הוסף סטודנט
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <input
          type="text"
          placeholder="חפש לפי שם או מספר תעודה..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full pl-4 pr-12 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Students List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-4">
            <Loader className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">טוען סטודנטים...</p>
          </div>
        </div>
      ) : data?.results && data.results.length > 0 ? (
        <div className="space-y-4">
          {data.results.map((student) => (
            <div
              key={student.id}
              className="rounded-lg border border-border bg-card p-4 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{student.full_name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>תעודה: {student.id_number}</span>
                    {student.address && <span>{student.address}</span>}
                  </div>
                  {student.mother_phone && (
                    <p className="text-xs text-muted-foreground mt-2">
                      אם: {student.mother_name} | {student.mother_phone}
                    </p>
                  )}
                  {student.father_phone && (
                    <p className="text-xs text-muted-foreground">
                      אב: {student.father_name} | {student.father_phone}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 mr-4">
                  <Link
                    to={`/student/${student.id}`}
                    className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <ChevronRight size={20} />
                  </Link>
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    disabled={deleteMutation.isPending}
                    className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground hover:text-destructive disabled:opacity-50"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {data.count > 10 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={!data.previous}
                className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                הקודם
              </button>
              <span className="text-sm text-muted-foreground">
                עמוד {page} מתוך {Math.ceil(data.count / 10)}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={!data.next}
                className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                הבא
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground mb-4">אין סטודנטים להצגה</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            <Plus size={18} />
            צור סטודנט ראשון
          </button>
        </div>
      )}

      {/* Student Modal */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateStudent}
        isLoading={createMutation.isPending}
      />
    </div>
  );
}
