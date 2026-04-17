const PrivacyPolicy = () => {
  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', color: '#e0e0e0', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#00ff88', fontSize: '2rem', marginBottom: '8px' }}>개인정보처리방침</h1>
        <p style={{ color: '#888', marginBottom: '40px' }}>최종 업데이트: 2026년 4월 17일</p>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '12px' }}>1. 수집하는 정보</h2>
          <p>본 서비스(코인 세금 계산기)는 사용자의 개인 식별 정보를 수집하지 않습니다. 세금 계산 시 입력하는 코인 종류, 매수/매도 가격, 수량 등의 정보는 서버로 전송되지 않으며 브라우저 내에서만 처리됩니다.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '12px' }}>2. 쿠키 및 분석</h2>
          <p>본 서비스는 Google Analytics 및 Google AdSense를 사용할 수 있으며, 이를 통해 익명의 사용 통계가 수집될 수 있습니다. 수집된 정보는 서비스 개선 목적으로만 사용됩니다.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '12px' }}>3. 광고</h2>
          <p>본 서비스는 Google AdSense 광고를 표시할 수 있습니다. Google은 사용자의 관심사에 맞는 광고를 표시하기 위해 쿠키를 사용할 수 있습니다. <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#00ff88' }}>Google 광고 정책 보기</a></p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '12px' }}>4. 면책조항</h2>
          <p>본 서비스에서 제공하는 세금 계산 결과는 참고용이며, 실제 납부 세액과 다를 수 있습니다. 정확한 세금 신고를 위해서는 세무사 또는 국세청 홈택스를 이용하시기 바랍니다.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '12px' }}>5. 문의</h2>
          <p>개인정보처리방침에 관한 문의사항은 a01026772868@gmail.com으로 연락 주시기 바랍니다.</p>
        </section>

        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #222' }}>
          <a href="/" style={{ color: '#00ff88', textDecoration: 'none' }}>← 계산기로 돌아가기</a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
