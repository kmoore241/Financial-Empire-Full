import { useState, useEffect } from 'react';
import { fetchOHLC, fetchIndicator } from '../utils/api';

/**
 * Fetch chart data and indicators for a given symbol
 */
const useChartData = (symbol, indicators = [], interval = '1d') => {
  const [ohlcData, setOhlcData] = useState([]);
  const [indicatorData, setIndicatorData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      setOhlcData([]);
      setIndicatorData({});

      try {
        const ohlc = await fetchOHLC(symbol, interval);
        const indData = {};
        for (let ind of indicators) {
          indData[ind] = await fetchIndicator(symbol, ind, interval);
        }
        if (isMounted) {
          setOhlcData(ohlc);
          setIndicatorData(indData);
        }
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load chart data.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (symbol) load();

    return () => {
      isMounted = false;
    };
  }, [symbol, interval, JSON.stringify(indicators)]); // serialize indicators to avoid array identity issues

  return { ohlcData, indicatorData, loading, error };
};

export default useChartData;
