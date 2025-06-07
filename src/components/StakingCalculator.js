import React, { useState } from 'react';

export default function StakingCalculator() {
    const [stakeAmount, setStakeAmount] = useState(100);
    const apy = 0.125; // 12.5% APY

    const calculateRewards = (amount) => {
        const annual = (amount * apy);
        const monthly = annual / 12;
        const total = amount + annual;

        return {
            annual: annual.toFixed(2),
            monthly: monthly.toFixed(2),
            total: total.toFixed(2)
        };
    };

    const rewards = calculateRewards(stakeAmount);

    const setPresetAmount = (amount) => {
        setStakeAmount(amount);
    };

    return (
        <div className="staking-calculator">
            <h4>💰 Staking Calculator</h4>
            <div className="calculator-form">
                <div className="input-group">
                    <label>Stake Amount (CLAYER)</label>
                    <div className="input-with-buttons">
                        <input
                            type="number"
                            value={stakeAmount}
                            className="stake-input"
                            onChange={(e) => setStakeAmount(parseFloat(e.target.value) || 0)}
                        />
                        <div className="preset-buttons">
                            <button className="preset-btn" onClick={() => setPresetAmount(10)}>10</button>
                            <button className="preset-btn" onClick={() => setPresetAmount(100)}>100</button>
                            <button className="preset-btn" onClick={() => setPresetAmount(1000)}>1000</button>
                        </div>
                    </div>
                </div>

                <div className="calculator-results">
                    <div className="result-item">
                        <span>Annual Rewards</span>
                        <span className="reward-value">{rewards.annual} CLAYER</span>
                    </div>
                    <div className="result-item">
                        <span>Monthly Rewards</span>
                        <span className="reward-value">{rewards.monthly} CLAYER</span>
                    </div>
                    <div className="result-item">
                        <span>APY</span>
                        <span className="reward-value">12.5%</span>
                    </div>
                    <div className="result-item total">
                        <span>Total After 1 Year</span>
                        <span className="reward-value">{rewards.total} CLAYER</span>
                    </div>
                </div>
            </div>
        </div>
    );
} 