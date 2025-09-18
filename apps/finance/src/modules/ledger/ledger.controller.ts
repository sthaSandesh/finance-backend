import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('ledger')
export class LedgerController {
  constructor(private ledgerservice: LedgerService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  ledgerByAccount(@Query('account') account: string, @Req() req) {
    const userId = req.user.id; // from JWT payload
    return this.ledgerservice.ledgerByAccount(account, userId);
  }
}
