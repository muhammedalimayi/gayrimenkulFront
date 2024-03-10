export class Advertisement {
    title: string = "";
    price: number = 0;
    fitment: Fitment = 0;
    status: boolean = false;
}

export enum Fitment {
    Exist = 0,
    NotExist = 1
}