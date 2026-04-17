import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, ChevronUp } from 'lucide-react';
import AdUnit from '../components/AdUnit';

export default function Guide() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "업비트/빗썸에서 거래하면 자동 신고되나요?",
      a: "국내 원화마켓 거래소(업비트, 빗썸 등)를 이용하는 경우, 거래소에서 과세자료를 국세청에 제출하므로 과세 당국이 내역을 파악하게 됩니다. 하지만 세금 신고 및 납부 의무는 원칙적으로 납세자 본인에게 있으므로, 5월 종합소득세 신고 기간에 직접 신고(또는 세무대리인 위임)해야 할 가능성이 높습니다. (추후 국세청의 자동 신고 서비스 지원 여부에 따라 달라질 수 있습니다.)"
    },
    {
      q: "해외 거래소 코인도 세금 내야 하나요?",
      a: "네, 거주자가 해외 거래소(바이낸스 등)에서 거래하여 발생한 소득도 국내에서 과세 대상입니다. 해외 거래소 내역은 본인이 직접 증빙 자료를 취합하여 신고해야 하므로, 거래 내역을 미리 정리해두는 것이 중요합니다."
    },
    {
      q: "XRP를 RLUSD로 교환하면 과세되나요?",
      a: "네, 코인과 코인 간의 교환(가상자산 간 거래)도 원칙적으로 양도로 간주되어 과세 대상입니다. 교환 시점의 시가를 기준으로 양도차익을 계산하여 세금을 납부해야 합니다."
    },
    {
      q: "코인으로 손실이 났을 때도 신고해야 하나요?",
      a: "과세 기간(1.1~12.31) 동안의 총 수익에서 총 손실을 차감(통산)하여 최종적으로 이익이 났을 때만 세금을 냅니다. 만약 1년간 손실만 발생했다면 납부할 세금은 없으나, 손실 내역을 인정받기 위해 신고하는 것이 유리할 수 있습니다. (다만 주식과 달리 가상자산 간 결손금 이월공제는 아직 도입되지 않았습니다.)"
    },
    {
      q: "가족에게 코인을 증여하면 세금이 다른가요?",
      a: "코인을 양도(매도)하는 것이 아니라 가족에게 무상으로 이전(증여)하는 경우, 양도소득세가 아닌 '증여세'가 부과됩니다. 증여세는 양도소득세와 별개의 공제 한도(예: 배우자 6억 원, 직계존비속 5천만 원)와 누진세율(10~50%)이 적용되므로, 상황에 따라 증여가 절세 전략이 될 수도 있습니다."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>2027년 코인 세금 완전 가이드 | 가상자산 과세 총정리</title>
        <meta name="description" content="2027년 1월부터 시작되는 가상자산 과세, 핵심만 정리했습니다. 과세 대상, 계산 방법, 절세 전략까지." />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center border-b border-gray-800 pb-8">
          2027년 가상자산 과세 <span className="text-accent">완전 가이드</span>
        </h1>

        <div className="space-y-12">
          {/* Section 1 */}
          <section className="bg-card rounded-2xl p-6 sm:p-8 border border-gray-800 shadow-lg relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-accent rounded-l-2xl"></div>
            <h2 className="text-2xl font-bold text-white mb-6">과세 대상 vs 비과세</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-900/10 border border-red-900/30 p-5 rounded-xl">
                <h3 className="text-lg font-semibold text-warning mb-3 flex items-center">
                  <span className="mr-2">💰</span> 과세 대상 (세금 부과)
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>원화 마켓에서 코인 매도</li>
                  <li>코인 ↔ 코인 간의 교환 (예: BTC로 ETH 구매)</li>
                  <li>코인을 이용한 물품 구매</li>
                  <li>가상자산 대여 소득 (스테이킹 등)</li>
                </ul>
              </div>
              <div className="bg-green-900/10 border border-green-900/30 p-5 rounded-xl">
                <h3 className="text-lg font-semibold text-accent mb-3 flex items-center">
                  <span className="mr-2">🛡️</span> 비과세 (세금 면제)
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>코인을 단순히 보유만 하는 경우</li>
                  <li>동일인 명의의 지갑/거래소 간 코인 이체</li>
                  <li>(증여세 별도) 무상으로 받는 경우 (에어드랍 일부 예외 있음)</li>
                </ul>
              </div>
            </div>
          </section>

          <AdUnit slot="XXXXXXXXXX" />

          {/* Section 2 */}
          <section className="bg-card rounded-2xl p-6 sm:p-8 border border-gray-800 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">세금 계산 방법 (예시 포함)</h2>
            <p className="text-gray-300 mb-6">
              가상자산으로 얻은 이익(양도차익)에서 1년 기준 250만 원의 기본공제를 뺀 금액에 22%(지방소득세 포함)를 곱하여 세금을 계산합니다.
            </p>
            <div className="bg-background rounded-xl p-6 border border-gray-700 font-mono text-sm sm:text-base">
              <p className="text-gray-400 mb-2">// 계산 예시: 1,000만원 매수 → 2,000만원 매도</p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">양도차익 (2,000 - 1,000)</span>
                  <span className="text-white">= 1,000만원</span>
                </div>
                <div className="flex justify-between text-warning">
                  <span>기본공제</span>
                  <span>- 250만원</span>
                </div>
                <div className="flex justify-between border-t border-gray-700 pt-2">
                  <span className="text-gray-300">과세표준</span>
                  <span className="text-white">= 750만원</span>
                </div>
                <div className="flex justify-between border-t border-gray-700 pt-2">
                  <span className="text-gray-300">세금 (750만원 × 22%)</span>
                  <span className="text-accent font-bold">= 165만원</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-card rounded-2xl p-6 sm:p-8 border border-gray-800 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              취득원가 계산법 <span className="ml-3 px-2 py-1 bg-warning text-xs text-background rounded font-bold animate-pulse">중요!</span>
            </h2>
            <p className="text-gray-300 mb-4">
              과세가 시작되는 2027년 이전에 보유하고 있던 코인은 어떻게 취득원가를 계산할까요? 정부는 투자자를 보호하기 위해 <strong>의제취득가액</strong> 제도를 도입했습니다.
            </p>
            <div className="bg-[#1a1a2e] rounded-xl p-5 border border-blue-900/50 mb-4">
              <p className="font-semibold text-white mb-2">💡 취득원가 = Max(실제 취득가, 2026년 12월 31일 시가)</p>
              <p className="text-sm text-gray-400">
                실제로 코인을 산 가격과 2026년 마지막 날의 가격 중 <strong className="text-accent">더 높은 금액</strong>을 취득원가로 인정해 줍니다. 
                따라서 예전에 아주 싸게 산 코인이라도, 2026년 말에 가격이 올랐다면 세금을 대폭 줄일 수 있습니다.
              </p>
            </div>
            <p className="text-sm text-gray-500">
              * 단, 해당 코인을 2027년 1월 1일 이후에 처음 매수했다면, 실제 매수한 가격만 취득원가로 인정됩니다.
            </p>
          </section>

          {/* Section 4 (FAQ) */}
          <section className="bg-card rounded-2xl p-6 sm:p-8 border border-gray-800 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-8">자주 묻는 질문 (FAQ)</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`border rounded-xl transition-colors ${openFaq === index ? 'bg-gray-800/50 border-gray-600' : 'bg-background border-gray-800 hover:border-gray-700'}`}
                >
                  <button
                    className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-medium text-gray-200 pr-8">{faq.q}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-accent flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-5 pt-1 text-gray-400 leading-relaxed text-sm sm:text-base border-t border-gray-700/50 mt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
