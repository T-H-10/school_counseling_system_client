import { useState } from 'react';
import { X, Loader } from 'lucide-react';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export default function StudentModal({ isOpen, onClose, onSubmit, isLoading }: StudentModalProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    id_number: '',
    address: '',
    mother_name: '',
    mother_phone: '',
    father_name: '',
    father_phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'שם הסטודנט נדרש';
    }

    if (!formData.id_number.trim()) {
      newErrors.id_number = 'מספר תעודה נדרש';
    } else if (!/^\d{9}$/.test(formData.id_number)) {
      newErrors.id_number = 'מספר תעודה חייב להיות 9 ספרות';
    }

    if (formData.mother_phone && !/^\d{10}$/.test(formData.mother_phone)) {
      newErrors.mother_phone = 'מספר טלפון של אם חייב להיות 10 ספרות';
    }

    if (formData.father_phone && !/^\d{10}$/.test(formData.father_phone)) {
      newErrors.father_phone = 'מספר טלפון של אב חייב להיות 10 ספרות';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-card p-6 shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">הוסף סטודנט חדש</h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1 hover:bg-muted rounded-lg transition-colors disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">שם מלא *</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.full_name ? 'border-destructive' : 'border-border'
                } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50`}
                placeholder="שם הסטודנט"
              />
              {errors.full_name && <p className="text-sm text-destructive mt-1">{errors.full_name}</p>}
            </div>

            {/* ID Number */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">מספר תעודה *</label>
              <input
                type="text"
                name="id_number"
                value={formData.id_number}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.id_number ? 'border-destructive' : 'border-border'
                } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50`}
                placeholder="9 ספרות"
              />
              {errors.id_number && <p className="text-sm text-destructive mt-1">{errors.id_number}</p>}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">כתובת</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                placeholder="כתובת הבית"
              />
            </div>

            {/* Mother Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">שם האם</label>
              <input
                type="text"
                name="mother_name"
                value={formData.mother_name}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                placeholder="שם האם"
              />
            </div>

            {/* Mother Phone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">טלפון של אם</label>
              <input
                type="tel"
                name="mother_phone"
                value={formData.mother_phone}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.mother_phone ? 'border-destructive' : 'border-border'
                } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50`}
                placeholder="0501234567"
              />
              {errors.mother_phone && <p className="text-sm text-destructive mt-1">{errors.mother_phone}</p>}
            </div>

            {/* Father Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">שם האב</label>
              <input
                type="text"
                name="father_name"
                value={formData.father_name}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                placeholder="שם האב"
              />
            </div>

            {/* Father Phone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">טלפון של אב</label>
              <input
                type="tel"
                name="father_phone"
                value={formData.father_phone}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.father_phone ? 'border-destructive' : 'border-border'
                } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50`}
                placeholder="0501234567"
              />
              {errors.father_phone && <p className="text-sm text-destructive mt-1">{errors.father_phone}</p>}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-50 transition-colors"
            >
              ביטול
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {isLoading && <Loader size={18} className="animate-spin" />}
              {isLoading ? 'שומר...' : 'הוסף סטודנט'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
