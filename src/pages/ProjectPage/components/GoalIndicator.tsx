import { Progress } from 'antd';
import React from 'react';

const GoalIndicator = ({proposed_goal, reached_goal} : GoalIndicatorProps) => {

    const percentage = (reached_goal / proposed_goal) * 100;

    return (
      <Progress
        type="circle"
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
        percent={percentage}
      />
    )
}

export type GoalIndicatorProps = {
  proposed_goal: number;
  reached_goal: number;
}

export default GoalIndicator;
