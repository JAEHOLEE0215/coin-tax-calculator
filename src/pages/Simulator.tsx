import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import AdUnit from '../components/AdUnit';

export default function Simulator() {
  const [coinType, setCoinType] = useState('BTC');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [estimatedPrice2026, setEstimatedPrice2026] = useState('');
  const [targetSellPrice, setTargetSellPrice] = useState('');

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.floor(num));
  };

  const results = useMemo(() => {
    const qty = Number(quantity.replace(/,/g, ''));
    const buy = Number(purchasePrice.replace(/,/g, ''));
    const est2026 = Number(estimatedPrice2026.replace(/,/g, ''));
    const sell = Number(targetSellPrice.replace(/,/g, ''));

    if (!qty || !buy || !sell) return null;

    // 시나리오 1: 2026년 이내 매도 (비과세)
    const profit2026 = (sell - buy) * qty;
    const tax2026 = 0;
    const netProfit2026 = profit2026;

    // 시나리오 2: 2027년 이후 매도
    // 취득원가 = max(실제 매수단가, 2026.12.31 시가)
    const deemedPurchasePrice = Math.max(buy, est2026 || buy);
    const totalPurchase2027 = deemedPurchasePrice * qty;
    const totalSell = sell * qty;
    
    const profit2027 = totalSell - totalPurchase2027;
    const taxable2027 = Math.max(0, profit2027 - 2500000);
    const tax2027 = taxable2027 * 0.22;
    
    // 실제 전체 수익(투자원금 기준)
    const actualTotalProfit2027 = (sell - buy) * qty - tax2027;

    return {
      scenario1: {
        profit: profit2026,
        tax: tax2026,
        netProfit: netProfit2026,
      },
      scenario2: {
        deemedPurchasePrice,
        profit: profit2027, // 과세 대상 양도차익
        tax: tax2027,
        netProfit: actualTotalProfit2027,
      },
      difference: netProfit2026 - actualTotalProfit2027
    };
  }, [quantity, purchasePrice, estimatedPrice2026, targetSellPrice]);

  return (
    <>
      <Helmet>
        <title>코인 절세 전략 시뮬레이터 | 지금 팔까 2027 이후 팔까</title>
        <meta name="description" content="지금 매도 vs 2027년 이후 매도, 어느 쪽이 세금을 더 줄일 수 있을까? 시나리오별 세금을 비교해드립니다." />
      </Helmet>

      <section className="pt-16 pb-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            지금 팔까, 2027년 이후 팔까? <span className="text-accent">절세 전략 시뮬레이터</span>
          </h1>
          <p className="text-gray-400">
            2026년 이내에 비과세로 매도할지, 의제취득가액을 활용해 2027년 이후에 매도할지 비교해보세요.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-gray-800 p-6 sm:p-8 shadow-xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">코인 종류</label>
              <select 
                className="w-full bg-background border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent"
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
              <label className="block text-sm font-medium text-gray-300 mb-2">현재 보유 수량</label>
              <input 
                type="number" 
                className="w-full bg-background border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="예: 2.5"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">실제 매수 단가 (원화)</label>
              <input 
                type="number" 
                className="w-full bg-background border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="예: 50000000"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                2026년 12월 31일 예상 시가
                <span className="text-xs text-gray-500 ml-2 block sm:inline">(의제취득가액 기준)</span>
              </label>
              <input 
                type="number" 
                className="w-full bg-background border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="미입력 시 실제 매수가 적용"
                value={estimatedPrice2026}
                onChange={(e) => setEstimatedPrice2026(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">목표 매도 단가 (원화)</label>
              <input 
                type="number" 
                className="w-full bg-background border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="예: 100000000"
                value={targetSellPrice}
                onChange={(e) => setTargetSellPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        {results && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* 추천 전략 배너 */}
            <div className={`p-4 rounded-xl border text-center font-bold text-lg shadow-lg flex items-center justify-center gap-2 ${
              results.difference > 0 
                ? 'bg-[#1a0a0a] border-warning text-warning' 
                : results.difference < 0 
                  ? 'bg-[#0a1a0a] border-accent text-accent' 
                  : 'bg-gray-800 border-gray-600 text-white'
            }`}>
              {results.difference > 0 
                ? `💡 2026년 이내 매도가 ${formatNumber(results.difference)}원 더 유리합니다 ✓` 
                : results.difference < 0 
                  ? `💡 2027년 이후 매도가 ${formatNumber(Math.abs(results.difference))}원 더 유리합니다 ✓` 
                  : '💡 두 시나리오의 예상 실수익이 동일합니다.'}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 시나리오 1 */}
              <div className="bg-[#1a0a0a] rounded-2xl border border-red-900/50 p-6 sm:p-8 shadow-xl relative overflow-hidden group hover:border-warning/50 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-6xl font-black italic">2026</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="bg-warning text-background text-sm py-1 px-3 rounded-full mr-3">현재</span>
                  2026년 이내 매도
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-800/50 pb-2">
                    <span className="text-gray-400">특징</span>
                    <span className="text-gray-300">취득원가 = 실제 매수가</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800/50 pb-2">
                    <span className="text-gray-400">양도차익</span>
                    <span className="text-white">{formatNumber(results.scenario1.profit)}원</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800/50 pb-2">
                    <span className="text-gray-400">세금 (비과세)</span>
                    <span className="text-warning font-medium">0원</span>
                  </div>
                  <div className="flex justify-between pt-4 mt-2">
                    <span className="text-lg font-medium text-gray-300">최종 실수익</span>
                    <span className="text-2xl font-bold text-white">{formatNumber(results.scenario1.netProfit)}원</span>
                  </div>
                </div>
              </div>

              {/* 시나리오 2 */}
              <div className="bg-[#0a1a0a] rounded-2xl border border-green-900/50 p-6 sm:p-8 shadow-xl relative overflow-hidden group hover:border-accent/50 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-6xl font-black italic">2027</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="bg-accent text-background text-sm py-1 px-3 rounded-full mr-3">과세</span>
                  2027년 이후 매도
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-800/50 pb-2">
                    <span className="text-gray-400">의제취득가액 적용</span>
                    <span className="text-gray-300">
                      단가 {formatNumber(results.scenario2.deemedPurchasePrice)}원
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800/50 pb-2">
                    <span className="text-gray-400">과세대상 차익</span>
                    <span className="text-white">{formatNumber(results.scenario2.profit)}원</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800/50 pb-2">
                    <span className="text-gray-400">예상 세금 (22%)</span>
                    <span className="text-warning font-medium">
                      -{formatNumber(results.scenario2.tax)}원
                    </span>
                  </div>
                  <div className="flex justify-between pt-4 mt-2">
                    <span className="text-lg font-medium text-gray-300">최종 실수익</span>
                    <span className="text-2xl font-bold text-accent">{formatNumber(results.scenario2.netProfit)}원</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </section>

      {/* ADSENSE: 반응형 시뮬레이터 결과 하단 */}
      <div className="max-w-5xl mx-auto px-4">
        <AdUnit slot="XXXXXXXXXX" />
      </div>
    </>
  );
}
