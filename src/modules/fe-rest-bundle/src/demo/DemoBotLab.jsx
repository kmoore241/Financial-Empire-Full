
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import BotRuntime from '../modules/ops-pack/bot-logic/BotRuntime';
import Grader from '../modules/ops-pack/bot-grading/grader';
import Scorecard from '../modules/ops-pack/bot-grading/Scorecard';
import TradeExporter from '../modules/ops-pack/exporting/TradeExporter';
import PriceFeedService from '../modules/market/PriceFeedService';

export default function DemoBotLab(){
  const tickerRef = React.useRef(PriceFeedService.makeTicker('BTC', 100));
  const getPrice = () => tickerRef.current.next();

  const [report, setReport] = React.useState(null);
  const [trades, setTrades] = React.useState([]);
  const [equity, setEquity] = React.useState([]);

  // Collect a lightweight equity curve from window logs (demo only)
  React.useEffect(()=>{
    const id = setInterval(()=>{
      const eq = parseFloat(document.querySelector('#__eq__')?.dataset.value || '0');
      if(eq>0){
        setEquity(prev => [...prev, { t:Date.now(), eq }]);
      }
    }, 1000);
    return ()=> clearInterval(id);
  }, []);

  const gradeNow = () => {
    const rep = Grader.score({ trades, equity });
    setReport(rep);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>Bot Runtime (demo)</CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500 mb-2">Generates prices via mock ticker; opens/closes positions on MA crosses with trailing stops.</div>
          <BotRuntime getPrice={getPrice} />
          {/* Hidden equity probe for demo; replace with state wiring in real app */}
          <div id="__eq__" data-value="0" style={{display:'none'}}></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>Score & Export</CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Button onClick={gradeNow}>Grade Bot</Button>
            <TradeExporter trades={trades} filename="demo-trades" />
          </div>
          <div className="mt-3">
            <Scorecard report={report} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
