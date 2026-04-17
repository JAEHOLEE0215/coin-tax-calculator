export default function Footer() {
  return (
    <footer className="bg-background border-t border-gray-800 py-8 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-gray-500 text-sm">
          <p className="mb-4 text-warning">본 계산기는 참고용이며 실제 세금과 다를 수 있습니다. 정확한 세무 상담은 전문가에게 문의하시기 바랍니다.</p>
          <div className="flex justify-center space-x-4 mb-4">
            <a href="#" className="hover:text-accent transition-colors">개인정보처리방침</a>
            <span>|</span>
            <a href="#" className="hover:text-accent transition-colors">이용약관</a>
          </div>
          <p>&copy; {new Date().getFullYear()} 코인세금계산기. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
