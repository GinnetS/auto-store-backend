import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Post('create-order')
  createOrder(@Body() body: { items: Array<{ name: string; unit_amount: string; quantity: number }>; currency?: string }) {
    return this.payments.createOrder(body.items, body.currency ?? 'USD');
  }

  @Post('capture/:orderId')
  capture(@Param('orderId') orderId: string) {
    return this.payments.captureOrder(orderId);
  }
}
