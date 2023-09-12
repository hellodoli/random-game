import React, { memo } from "react";
import { GradientSet } from "types/enum/color";
import { GRADIENT_COLOR_SET } from "modules/PercentGame/constants";
import { ROLL_TYPE, RollResult } from "modules/PercentGame/types";
import { DEFAULT_ROLL_TYPE } from "modules/PercentGame/constants";

import TicketIcon from "components/Icons/Game/Ticket";
import { Button } from "antd";

interface Props {
  id: number;
  onRoll: (
    consume: number,
    count: number,
    rates: RollResult[],
    gradient: GradientSet
  ) => void;
  disabled?: boolean;
  rollType?: ROLL_TYPE;
  consume?: number;
  count?: number;
  rates: RollResult[];
}

const ConSumeTicket = ({ consume = 1 }: { consume?: number }) => {
  return (
    <span className="consume-ticket-count">
      <span>(</span>
      <TicketIcon size={14} />
      <span className="consume-count">{`x ${consume}`}</span>
      <span>)</span>
    </span>
  );
};

const RollItem = ({
  id,
  onRoll,
  disabled = false,
  rollType = DEFAULT_ROLL_TYPE,
  consume = 1, // ticket/roll
  count = 1, // maximum roll
  rates
}: Props) => {
  const gradient = GRADIENT_COLOR_SET[rollType];
  const fromColor = gradient?.FROM || GRADIENT_COLOR_SET.BRONZE.FROM;
  const toColor = gradient?.TO || GRADIENT_COLOR_SET.BRONZE.TO;

  const maxConsumeTicket = count * consume;
  const background = `linear-gradient(to right, ${fromColor} , ${toColor})`;

  const onClickStartRoll = (consume: number, count: number) => {
    onRoll(consume, count, rates, gradient);
  };

  return (
    <div className="roll-block">
      <Button
        shape="round"
        onClick={() => onClickStartRoll(consume, 1)}
        disabled={disabled}
        className={`btn-roll ${rollType.toLowerCase()}`}
        style={{ background }}
        block
      >
        <strong>
          <span>(</span>
          <span>1</span>
          <span>)</span>
          <span style={{ marginRight: 2 }}></span>
          <ConSumeTicket consume={consume} />
        </strong>
      </Button>
      <Button
        shape="round"
        onClick={() => onClickStartRoll(maxConsumeTicket, count)}
        disabled={disabled}
        className={`btn-roll ${rollType.toLowerCase()}`}
        style={{ background }}
        block
      >
        <strong>
          <span>(</span>
          <span>{count}</span>
          <span>)</span>
          <span style={{ marginRight: 2 }}></span>
          <ConSumeTicket consume={maxConsumeTicket} />
        </strong>
      </Button>
    </div>
  );
};

export default memo(RollItem);
