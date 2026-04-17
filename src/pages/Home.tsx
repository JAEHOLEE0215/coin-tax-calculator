import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calculator } from 'lucide-react';
import AdUnit from '../components/AdUnit';
import { recordCalculation } from '../lib/supabase';

export default function Home() {
  const [coinType, setCoinType] = useState('BTC');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [result, setResult] = useState<null | {
    totalSell: number;
    totalPurchase: number;
    profit: number;
    taxable: number;
    tax: number;
    netProfit: number;
  }>(null);

  const calculateTax = () => {
    const buy = Number(purchasePrice.replace(/,/g, ''));
    const qty = Number(quantity.replace(/,/g, ''));
    const sell = Number(sellPrice.replace(/,/g, ''));

    if (!buy || !qty || !sell) return;

    const totalPurchase = buy * qty;
    const totalSell = sell * qty;
    const profit = totalSell - totalPurchase;
    
    // 기본공제 250만원
    const deduction = 2500000;
    const taxable = Math.max(0, profit - deduction);
    const tax = taxable * 0.22;
    const netProfit = profit > 0 ? profit - tax : profit;

    setResult({ totalSell, totalPurchase, profit, taxable, tax, netProfit });

    // Supabase에 익명 저장
    recordCalculation({
      coin_type: coinType,
      purchase_amount: totalPurchase,
      sell_amount: totalSell,
      tax_amount: tax,
      profit
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.floor(num));
  };

  return (
    <>
      <Helmet>
        <title>코인 세금 계산기 | 2027 가상자산 과세 완벽 계산</title>
        <meta name="description" content="코인(가상자산) 세금을 바로 계산하세요. 250만원 공제 후 22% 세율, 2027년 과세 완벽 대비. 비트코인, 이더리움, XRP 지원." />
      </Helmet>

      {/* 히어로 섹션 */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-background to-[#0f0f18]">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
          내 코인 세금, <span className="text-accent">지금 바로 계산하세요</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
          2027년 1월부터 시작되는 가상자산 과세 — 250만원 공제 후 22%
        </p>
        <button 
          onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-lg text-background bg-accent hover:bg-[#00e077] transition-all transform hover:scale-105"
        >
          <Calculator className="w-5 h-5 mr-2" />
          계산기 바로가기
        </button>
      </section>

      {/* 메인 계산기 */}
      <section id="calculator" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-card rounded-2xl shadow-xl border border-gray-800 p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-warning"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">코인 종류</label>
                <select 
                  className="w-full bg-background border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                  value={coinType}
                  onChange={(e) => setCoinType(e.target.value)}
                >
                  <option value="BTC">비트코인 (BTC)</option>
                  <option value="ETH">이더리움 (ETH)</option>
                  <option value="XRP">리플 (XRP)</option>
                  <option value="SOL">솔라나 (SOL)</option>
                  <option value="OTHER">기타</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">매수 단가 (원화)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    className="w-full bg-background border border-gray-700 rounded-lg pl-4 pr-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                    placeholder="예: 50000"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-gray-500">원</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">매수 수량</label>
                <input 
                  type="number" 
                  className="w-full bg-background border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                  placeholder="예: 100"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">매도 단가 (원화)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    className="w-full bg-background border border-gray-700 rounded-lg pl-4 pr-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                    placeholder="예: 80000"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-gray-500">원</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={calculateTax}
                className="w-full py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors shadow"
              >
                세금 계산하기
              </button>
            </div>

            <div className="relative">
              {result ? (
                <div className="h-full bg-[#0d0d16] border border-gray-800 rounded-xl p-6 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-xl font-bold text-white mb-6 text-center border-b border-gray-800 pb-4">계산 결과</h3>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">총 매도금액</span>
                      <span className="text-white font-medium">{formatNumber(result.totalSell)}원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">취득원가 합계</span>
                      <span className="text-white font-medium">{formatNumber(result.totalPurchase)}원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">양도차익</span>
                      <span className="text-white font-medium">{formatNumber(result.profit)}원</span>
                    </div>
                    <div className="flex justify-between text-warning">
                      <span>기본공제</span>
                      <span>-2,500,000원</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-800 pt-3">
                      <span className="text-gray-400">과세표준</span>
                      <span className="text-white font-medium">{formatNumber(result.taxable)}원</span>
                    </div>
                    
                    <div className="bg-background rounded-lg p-4 mt-4 border border-red-900/30">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 font-medium">납부 세액 (22%)</span>
                        <span className="text-warning text-xl font-bold">{formatNumber(result.tax)}원</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-gray-800 pt-2 mt-2">
                        <span className="text-gray-300 font-medium">실제 수령 수익</span>
                        <span className="text-accent text-xl font-bold">{formatNumber(result.netProfit)}원</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-6 text-center">
                    이 계산은 단순 시뮬레이션입니다.<br/>정확한 세금은 세무사에게 문의하세요.
                  </p>
                </div>
              ) : (
                <div className="h-full border-2 border-dashed border-gray-800 rounded-xl flex items-center justify-center p-8 text-center text-gray-500">
                  좌측에 거래 내역을 입력하고<br/>세금을 계산해보세요.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ADSENSE: 336x280 계산 결과 하단 */}
      <AdUnit slot="XXXXXXXXXX" />

      {/* SEO 콘텐츠 블록 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-gray-300">
        <h2 className="text-2xl font-bold text-white mb-6">2027년 코인 세금이란?</h2>
        <div className="space-y-4 leading-relaxed bg-card p-8 rounded-2xl border border-gray-800">
          <p>
            2027년 1월 1일부터 가상자산 양도소득세가 본격적으로 시행됩니다. 그동안 유예되었던 코인 세금이 현실화되면서 많은 투자자들이 세금 폭탄을 피하기 위해 대비하고 있습니다.
          </p>
          <p>
            코인 세금 계산기를 활용하면 예상되는 양도차익을 쉽게 확인할 수 있습니다. 가상자산의 매매 혹은 교환으로 발생한 소득 중 기본공제 금액인 250만 원을 초과하는 금액에 대해 22%(지방소득세 포함)의 세율이 적용됩니다. 예를 들어 1,000만 원의 수익이 발생했다면, 250만 원을 제외한 750만 원에 대해 22%인 165만 원을 세금으로 납부해야 합니다.
          </p>
          <p>
            저희 코인 세금 계산기는 투자자 여러분이 복잡한 세무 지식 없이도 단가와 수량만 입력하여 즉시 예상 세액과 실제 수령액을 파악할 수 있도록 돕습니다. 미리 절세 전략을 세우고, 시뮬레이터 기능을 통해 2026년 이내 매도와 2027년 이후 매도 중 어느 쪽이 유리한지 비교해보세요.
          </p>
        </div>
      </section>
    </>
  );
}
