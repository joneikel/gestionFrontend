import { Progress } from 'antd';
import { useEffect, useState } from 'react';
import { MeasurementUnit } from '../../../models';

const GoalIndicator = ({ proposed_goal, reached_goal, unit }: GoalIndicatorProps) => {

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setPercentage((reached_goal / proposed_goal) * 100);
    }, 550);
  }, [reached_goal, proposed_goal])

  return (
    <div style={{
      display: "flex", flexFlow: 'column',
      justifyContent: 'space-evenly', alignContent: 'center'
    }}>
      <Progress
        success={{ percent: 0 }}
        type="circle"
        strokeColor={{
          '0%': '#108ee9',
          '50%': '#e6d71e',
          '100%': '#33bd22',
        }}
        percent={Number.parseFloat(percentage.toFixed(2))}
      />
      <div color="#40c285" style={{ textAlign: 'center' }}>
        {unit.name}
        <br />
        {removeUnnecesaryZeroes(unit.pivot.reached_goal)}
         /
        {removeUnnecesaryZeroes(unit.pivot.proposed_goal)}
      </div>
    </div>
  )
}

export function removeUnnecesaryZeroes(x?: number) {
  return x || 0 % 1 === 0 ? Math.trunc(x || 0) : x
}

export type GoalIndicatorProps = {
  proposed_goal: number;
  reached_goal: number;
  unit: MeasurementUnit;
}

export default GoalIndicator;
