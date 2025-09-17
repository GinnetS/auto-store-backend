import { PaymentsService } from './payments.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class PaymentsController {
    private readonly payments;
    constructor(payments: PaymentsService);
    createOrder(body: CreateOrderDto): Promise<any>;
    capture(orderId: string): Promise<any>;
}
//# sourceMappingURL=payments.controller.d.ts.map