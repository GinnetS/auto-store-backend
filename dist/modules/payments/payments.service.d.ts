export declare class PaymentsService {
    createOrder(items: Array<{
        name: string;
        unit_amount: string;
        quantity: number;
    }>, currency?: string): Promise<any>;
    captureOrder(orderId: string): Promise<any>;
}
//# sourceMappingURL=payments.service.d.ts.map