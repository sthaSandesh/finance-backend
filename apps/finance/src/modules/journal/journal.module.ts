import { Module } from '@nestjs/common';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [JournalController],
  providers: [JournalService]
})
export class JournalModule {}
