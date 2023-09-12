import React from "react";
import { Progress } from "antd";
import "./style.scss";

interface Props {
  percent?: number;
  fromColor?: string;
  toColor?: string;
  status?: "normal" | "exception" | "active" | "success";
  showInfo?: boolean;
}

const LoadingProgress = ({
  percent = 0,
  fromColor = "#ff4d82",
  toColor = "#722ed1",
  status = "active",
  showInfo = true
}: Props) => {
  return (
    <div className="progress-wrapper">
      <Progress
        percent={percent}
        strokeColor={{ from: fromColor, to: toColor }}
        status={status}
        showInfo={showInfo}
      />
    </div>
  );
};

export default LoadingProgress;
