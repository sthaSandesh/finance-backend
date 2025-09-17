import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { JournalModule } from './modules/journal/journal.module';
import { LedgerModule } from './modules/ledger/ledger.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    AuthModule,
    JournalModule,
    LedgerModule,
    DatabaseModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class MainModule {}
