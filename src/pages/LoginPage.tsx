import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useApi';
import { AlertCircle, Loader } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await loginMutation.mutateAsync({ username, password });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'שגיאה בהתחברות. אנא בדוק את הנתונים שלך.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8 space-y-8">
          {/* Header */}
          <div className="space-y-3 text-center">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
              <span className="text-2xl font-bold">ס</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">מערכת יועץ בית ספר</h1>
            <p className="text-muted-foreground">התחברות ליועץ</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Username Input */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-foreground">
                שם משתמש
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="הכנס שם משתמש"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={loginMutation.isPending}
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                סיסמה
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="הכנס סיסמה"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={loginMutation.isPending}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loginMutation.isPending || !username || !password}
              className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loginMutation.isPending && <Loader size={18} className="animate-spin" />}
              {loginMutation.isPending ? 'מתחבר...' : 'התחברות'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="pt-4 border-t border-border text-center text-sm text-muted-foreground">
            <p>נסה עם הנתונים הדמו:</p>
            <p className="font-mono mt-2 text-xs bg-muted/50 p-3 rounded">
              שם משתמש: demo<br />סיסמה: demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
