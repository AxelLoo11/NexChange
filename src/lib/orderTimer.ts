// lib/orderTimers.ts

type Timers = { [key: string]: NodeJS.Timeout };

class OrderTimerStore {
  private timers: Timers = {};

  setTimer(orderId: string, timer: NodeJS.Timeout) {
    this.timers[orderId] = timer;
  }

  clearTimer(orderId: string) {
    if (this.timers[orderId]) {
      clearTimeout(this.timers[orderId]);
      delete this.timers[orderId];
    }
  }

  getTimer(orderId: string) {
    return this.timers[orderId];
  }
}

const orderTimerStore = new OrderTimerStore();
export default orderTimerStore;
