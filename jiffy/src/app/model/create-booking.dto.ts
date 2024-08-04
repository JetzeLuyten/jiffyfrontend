export interface CreateBooking {
    bookerAuthId: string;
    serviceId: number;
    bookingTime: Date;
    completed: boolean;
  }