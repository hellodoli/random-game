import { PercentGameState } from "modules/PercentGame/types";
import { DEFAULT_TICKET_PRICE } from "modules/PercentGame/constants";

const ticketPrice = DEFAULT_TICKET_PRICE;

export const moneyActions = {
  buyTicket: (state: PercentGameState) => {
    if (state.money >= ticketPrice) {
      state.ticket += 1;
      state.money -= ticketPrice;
    }
  },
  sellTicket: (state: PercentGameState) => {
    if (state.ticket > 0) {
      state.ticket -= 1;
      state.money += ticketPrice;
    }
  }
};
