import { useDashboard } from '../hooks/useApi';
import { Link } from 'react-router-dom';
import { Users, Calendar, FileText, TrendingUp, Plus, Loader } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';


export default function DashboardPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">טוען נתונים...</p>
        </div>
      </div>
    );
  }

  const stats = [
    // {
    //   label: 'סטודנטים פעילים',
    //   value: data?.statistics?.active_students || 0,
    //   icon: Users,
    //   color: 'from-blue-500 to-blue-600',
    // },
    // {
    //   label: 'סך הכל אירועים',
    //   value: data?.statistics?.total_events || 0,
    //   icon: FileText,
    //   color: 'from-purple-500 to-purple-600',
    // },
    {
      label: 'הפגישות היום',
      value: data?.today_sessions || 0,
      icon: Calendar,
      color: 'from-emerald-500 to-emerald-600',
    },
    // {
    //   label: 'סטודנטים כולל',
    //   value: data?.total_students || 0,
    //   icon: TrendingUp,
    //   color: 'from-orange-500 to-orange-600',
    // },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">דירוג</h1>
          <p className="text-muted-foreground mt-2">ברוכים הבאים בחזרה ליועץ בית ספר</p>
        </div>
        <Link
          to="/students"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors w-fit"
        >
          <Plus size={18} />
          הוסף סטודנט
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <div className={`rounded-lg bg-gradient-to-br ${stat.color} p-3 text-white`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Events */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-xl font-bold text-foreground">אירועים אחרונים</h2>
        </div>
        {data?.recent_events && data.recent_events.length > 0 ? (
          <div className="divide-y divide-border">
            {data.recent_events.map((event) => (
              <div key={event.id} className="px-6 py-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {event.event_type === 'meeting'
                          ? 'פגישה'
                          : event.event_type === 'call'
                          ? 'שיחה'
                          : event.event_type === 'teacher_report'
                          ? 'דוח מורה'
                          : 'אחר'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(event.date)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <p className="text-muted-foreground">אין אירועים לאחרונה</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/students"
          className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-primary transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <Users className="text-primary" size={28} />
            <span className="text-2xl group-hover:translate-x-2 transition-transform">←</span>
          </div>
          <h3 className="font-semibold text-foreground">ניהול סטודנטים</h3>
          <p className="text-sm text-muted-foreground mt-2">צפה בכל הסטודנטים וערוך את הפרטים שלהם</p>
        </Link>

        <Link
          to="/calendar"
          className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-primary transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <Calendar className="text-primary" size={28} />
            <span className="text-2xl group-hover:translate-x-2 transition-transform">←</span>
          </div>
          <h3 className="font-semibold text-foreground">לוח שנה</h3>
          <p className="text-sm text-muted-foreground mt-2">צפה בהפגישות שלך וסדר אירועים</p>
        </Link>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md cursor-help">
          <div className="flex items-center justify-between mb-4">
            <FileText className="text-primary" size={28} />
            <span className="text-sm font-semibold text-primary">חדש</span>
          </div>
          <h3 className="font-semibold text-foreground">דוחות</h3>
          <p className="text-sm text-muted-foreground mt-2">צפה בדוחות תקופתיים וניתוחים</p>
        </div>
      </div>
    </div>
  );
}
