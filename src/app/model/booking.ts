import { Service } from "./service";
import { User } from "./user";


export interface Booking {
    id: number;
    bookerId: number;
    booker: User;
    serviceId: number;
    service: Service;
    bookingTime: string;
    complete: boolean;
}