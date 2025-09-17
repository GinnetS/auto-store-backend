import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

   @Post('create-order')
  @ApiBody({ type: CreateOrderDto })
  createOrder(@Body() body: CreateOrderDto) {
    return this.payments.createOrder(body.items, body.currency ?? 'USD');
  }

  @Post('capture/:orderId')
  capture(@Param('orderId') orderId: string) {
    return this.payments.captureOrder(orderId);
  }
}
