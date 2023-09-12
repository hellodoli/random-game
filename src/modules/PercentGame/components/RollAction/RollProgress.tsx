import React, { memo } from "react";
import { useSelector } from "react-redux";
import { colorGradientSelector } from "modules/PercentGame/selectors";
import Progress from "components/Progress";

const RollProgress = ({ progress }: { progress: number }) => {
  const rollGradient = useSelector(colorGradientSelector);
  return (
    <>
      <Progress
        percent={progress}
        showInfo={false}
        fromColor={rollGradient?.FROM || ""}
        toColor={rollGradient?.TO || ""}
      />
    </>
  );
};

export default memo(RollProgress);
