import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly payments;
    constructor(payments: PaymentsService);
    createOrder(body: {
        items: Array<{
            name: string;
            unit_amount: string;
            quantity: number;
        }>;
        currency?: string;
    }): Promise<any>;
    capture(orderId: string): Promise<any>;
}
//# sourceMappingURL=payments.controller.d.ts.map