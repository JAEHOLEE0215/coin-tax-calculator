import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Calculator className="w-6 h-6 text-accent" />
              <div>
                <span className="font-bold text-xl text-white tracking-tight">코인세금계산기</span>
                <span className="hidden sm:inline-block ml-3 text-xs text-gray-400">2027년 가상자산 과세 완벽 대비</span>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-300 hover:text-accent transition-colors">계산기</Link>
            <Link to="/simulator" className="text-sm font-medium text-gray-300 hover:text-accent transition-colors">절세 시뮬레이터</Link>
            <Link to="/guide" className="text-sm font-medium text-gray-300 hover:text-accent transition-colors">과세 가이드</Link>
          </nav>
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/" className="text-xs text-gray-300">계산기</Link>
            <Link to="/simulator" className="text-xs text-gray-300">시뮬레이터</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
