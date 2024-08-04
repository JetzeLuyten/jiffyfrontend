import { User } from "./user";
import { ServiceType } from "./serviceType";

export interface Service{
    id: number;
    title: string;
    serviceTypeId: number;
    serviceType: ServiceType;
    description: string;
    userId: number;
    user: User;
    publishDate: string;
    price: number;
}