import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught runtime error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-slate-800/90 border border-slate-700 rounded-3xl p-8 space-y-6 shadow-2xl backdrop-blur-md">
            <div className="w-16 h-16 bg-red-500/20 border border-red-500/40 text-red-400 rounded-2xl mx-auto flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-heading">حدث خطأ مؤقت / Temporary Error</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                نعتذر، حدثت مشكلة أثناء تحميل الصفحة. نرجو إعادة المحاولة أو التواصل عبر الواتساب.
              </p>
            </div>

            <button
              onClick={this.handleReload}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg"
            >
              <RefreshCw className="w-4 h-4 animate-spin-slow" />
              <span>إعادة تحميل الصفحة / Reload Page</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
