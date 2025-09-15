import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk';

function client() {
  const environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID || '',
    process.env.PAYPAL_CLIENT_SECRET || '',
  );  
  console.log("environment",environment);
  
  return new paypal.core.PayPalHttpClient(environment);
}

@Injectable()
export class PaymentsService {
  async createOrder(items: Array<{ name: string; unit_amount: string; quantity: number }>, currency: string = 'USD') {
    const total = items.reduce((sum, it) => sum + parseFloat(it.unit_amount) * it.quantity, 0);
    console.log("total",total);
    
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
    } catch (e) {
      throw new InternalServerErrorException('PayPal create order failed');
    }
  }

  async captureOrder(orderId: string) {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    try {
      const resp = await client().execute(request);
      return resp.result;
    } catch (e) {
      throw new InternalServerErrorException('PayPal capture failed');
    }
  }
}
