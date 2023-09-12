import React, { memo } from "react";
import { useSelector } from "react-redux";
import { moneySelector } from "modules/PercentGame/selectors";

import { Flex } from "@gapo_ui/components";
import CrownCoin from "components/Icons/Game/CrownCoin";

const Money = () => {
  const money = useSelector(moneySelector);
  return (
    <Flex
      UNSAFE_className="consume-item coins"
      alignItems="center"
      marginEnd={10}
    >
      <CrownCoin size={20} classNames="coin-icon" marginRight={4} />
      <span className="text number-coin">{money}</span>
    </Flex>
  );
};

export default memo(Money);
