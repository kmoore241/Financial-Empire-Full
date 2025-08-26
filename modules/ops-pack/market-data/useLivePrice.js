
import { useEffect, useState, useRef } from 'react';
import FeedAdapters from './FeedAdapters';

export default function useLivePrice(symbol='BTC'){
  const api = useRef(FeedAdapters.fromMock());
  const [price, setPrice] = useState(0);
  useEffect(()=>{
    let mounted = true;
    const loop = async () => {
      const { price } = await api.current.price(symbol);
      if(mounted) setPrice(price);
    };
    loop();
    const id = setInterval(loop, 1000);
    return ()=>{ mounted=false; clearInterval(id); };
  }, [symbol]);
  return price;
}
