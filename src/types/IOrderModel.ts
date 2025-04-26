export interface IOrderModel {
    payment: string;
    address: string;
    email: string;
    phone: string;
  
    setPayment(method: string): void;
    setAddress(address: string): void;
    setEmail(email: string): void;
    setPhone(phone: string): void;
    isValidStep1(): boolean;
    isValidStep2(): boolean;
    clear(): void;
  }
  