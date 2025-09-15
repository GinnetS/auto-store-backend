"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const paypal = require("@paypal/checkout-server-sdk");
function client() {
    const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID || '', process.env.PAYPAL_CLIENT_SECRET || '');
    console.log("environment", environment);
    return new paypal.core.PayPalHttpClient(environment);
}
let PaymentsService = class PaymentsService {
    async createOrder(items, currency = 'USD') {
        const total = items.reduce((sum, it) => sum + parseFloat(it.unit_amount) * it.quantity, 0);
        console.log("total", total);
        const request = new paypal.orders.OrdersCreateRequest();
        request.headers['prefer'] = 'return=representation';
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: currency,
                        value: total.toFixed(2),
                        breakdown: {
                            item_total: { currency_code: currency, value: total.toFixed(2) },
                        },
                    },
                    items: items.map((it) => ({
                        name: it.name,
                        unit_amount: { currency_code: currency, value: parseFloat(it.unit_amount).toFixed(2) },
                        quantity: it.quantity.toString(),
                    })),
                },
            ],
        });
        try {
            const resp = await client().execute(request);
            return resp.result;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('PayPal create order failed');
        }
    }
    async captureOrder(orderId) {
        const request = new paypal.orders.OrdersCaptureRequest(orderId);
        request.requestBody({});
        try {
            const resp = await client().execute(request);
            return resp.result;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('PayPal capture failed');
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)()
], PaymentsService);
//# sourceMappingURL=payments.service.js.map