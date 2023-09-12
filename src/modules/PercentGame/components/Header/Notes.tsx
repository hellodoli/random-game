import React from "react";
import { DEFAULT_TICKET_PRICE } from "modules/PercentGame/constants";

import { Flex } from "@gapo_ui/components";
import TicketIcon from "components/Icons/Game/Ticket";
import CrownCoin from "components/Icons/Game/CrownCoin";

interface Props {
  ticketPrice?: number;
}

const Notes = ({ ticketPrice = DEFAULT_TICKET_PRICE }: Props) => {
  return (
    <Flex
      alignItems="center"
      UNSAFE_className="consume-item notes"
      marginEnd="auto"
    >
      <span>(</span>
      <TicketIcon size={14} marginRight={4} />
      <span>{`= ${ticketPrice}`}</span>
      <CrownCoin
        size={14}
        marginLeft={2}
        marginRight={4}
        classNames="coin-icon"
      />
      <span>)</span>
    </Flex>
  );
};

export default Notes;
