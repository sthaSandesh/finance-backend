import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { JournalModule } from './modules/journal/journal.module';
import { LedgerModule } from './modules/ledger/ledger.module';

@Module({
  controllers: [],
  providers: [],
  imports: [AuthModule, JournalModule, LedgerModule],
})
export class MainModule {}
