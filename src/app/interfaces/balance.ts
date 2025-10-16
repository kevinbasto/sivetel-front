export interface BalanceRaw {
    rechargeBalance: string;
    sms: string;
    servicesBalance: string;
}

export interface Balance {
    rechargeBalance: number;
    sms: number;
    servicesBalance: number;
}