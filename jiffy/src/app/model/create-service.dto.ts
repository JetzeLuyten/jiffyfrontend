export interface CreateServiceDto {
    title: string;
    description: string;
    serviceTypeId: number;
    userId: string;
    publishDate: Date;
    price: number;
  }