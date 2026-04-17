import { useEffect } from 'react';

interface AdUnitProps {
  slot: string;
  style?: React.CSSProperties;
  format?: string;
  responsive?: boolean;
}

export default function AdUnit({ slot, style = { display: 'block' }, format = 'auto', responsive = true }: AdUnitProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  const client = import.meta.env.VITE_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXX';

  if (!import.meta.env.PROD) {
    return (
      <div 
        className="bg-gray-800/50 border border-gray-700 rounded flex items-center justify-center text-gray-500 my-4"
        style={style}
      >
        <span>AdSense Placeholder ({slot})</span>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden my-4 flex justify-center">
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
