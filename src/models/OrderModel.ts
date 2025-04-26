import { IOrderModel, IEventEmitter } from '@/types';

export class OrderModel implements IOrderModel {
  payment = '';
  address = '';
  email = '';
  phone = '';

  constructor(private events: IEventEmitter) {}

  setPayment(method: string) {
    this.payment = method;
    this.events.emit('order:updated', null);
  }

  setAddress(address: string) {
    this.address = address;
    this.events.emit('order:updated', null);
  }

  setEmail(email: string) {
    this.email = email;
    this.events.emit('order:updated', null);
  }

  setPhone(phone: string) {
    this.phone = phone;
    this.events.emit('order:updated', null);
  }

  isValidStep1(): boolean {
    return this.payment !== '' && this.address.trim() !== '';
  }

  isValidStep2(): boolean {
    return this.email.trim() !== '' && this.phone.trim() !== '';
  }

  clear() {
    this.payment = '';
    this.address = '';
    this.email = '';
    this.phone = '';
    this.events.emit('order:cleared', null);
  }
}
