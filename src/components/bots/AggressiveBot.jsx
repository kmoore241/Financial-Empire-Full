
import React from 'react';
import BotControls from './BotControls';
import LivePriceTicker from './LivePriceTicker';
import TradeForm from './TradeForm';
import PositionTable from './PositionTable';
import PnLWidget from './PnLWidget';
import RiskSettings from './RiskSettings';
import StrategyConfig from './StrategyConfig';
import BacktestPanel from './BacktestPanel';
import { getLS, setLS } from './storage';
import { STORAGE_KEYS } from './defaults';

export default function AggressiveBot(){
  const [running, setRunning] = React.useState(false);
  const [symbol, setSymbol] = React.useState(getLS('fe:bots:lastSymbol', 'ETH'));
  const [price, setPrice] = React.useState(0);
  const [open, setOpen] = React.useState(getLS(STORAGE_KEYS.open, []));
  const cfg = getLS(STORAGE_KEYS.cfg, {});

  React.useEffect(()=>setLS('fe:bots:lastSymbol', symbol), [symbol]);

  const openPosition = ({ symbol, side, entry, stop, qty }) => {
    const pos = {
      id: 'p'+Date.now(),
      symbol, side, entry, stop, qty,
      trailing: getLS(STORAGE_KEYS.account, { trailing:true }).trailing,
      trail: null,
      trailPct: (cfg.aggressive?.trailPct ?? 0.8),
      openedAt: Date.now(),
    };
    const next = [pos, ...open];
    setOpen(next);
    setLS(STORAGE_KEYS.open, next);
  };

  return (
    <div className="space-y-4">
      <BotControls running={running} setRunning={setRunning} symbol={symbol} setSymbol={setSymbol} />

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <LivePriceTicker symbol={symbol} onTick={setPrice} />
          <TradeForm symbol={symbol} price={price} onSubmit={openPosition} />
          <PositionTable price={price} />
        </div>
        <div className="space-y-4">
          <PnLWidget />
          <RiskSettings />
          <StrategyConfig keyName="aggressive" />
          <BacktestPanel symbol={symbol} />
        </div>
      </div>
    </div>
  );
}
