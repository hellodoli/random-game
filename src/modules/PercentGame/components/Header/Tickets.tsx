import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ticketSelector,
  moneySelector,
  isRollingSelector
} from "modules/PercentGame/selectors";
import { actions } from "modules/PercentGame/slices";

import { Button } from "antd";
import { Flex } from "@gapo_ui/components";
import {
  IconIc24FillPlusmarkCircle as PlusIcon,
  IconIc24FillMinusCircle as MinusIcon
} from "@gapo_ui/icon";
import TicketIcon from "components/Icons/Game/Ticket";

const Tickets = () => {
  const dispatch = useDispatch();
  const ticket = useSelector(ticketSelector);
  const money = useSelector(moneySelector);
  const isRolling = useSelector(isRollingSelector);
  return (
    <Flex alignItems="center" UNSAFE_className="consume-item ticket">
      <TicketIcon size={20} marginRight={4} />
      <Button
        shape="circle"
        icon={<PlusIcon size={14} className="buy-ticket-icon" />}
        className="buy-ticket-btn buy-ticket-add"
        onClick={() => dispatch(actions.buyTicket())}
        disabled={!money || isRolling}
        ghost
      ></Button>
      <span className="text number-ticket">{ticket}</span>
      <Button
        shape="circle"
        icon={<MinusIcon size={14} className="buy-ticket-icon" />}
        className="buy-ticket-btn buy-ticket-minus"
        onClick={() => dispatch(actions.sellTicket())}
        disabled={!ticket || isRolling}
        ghost
      ></Button>
    </Flex>
  );
};

export default memo(Tickets);
