import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../journal/schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class LedgerService {
  constructor(
    @Inject(DATABASE_CONNECTION) private database: NodePgDatabase<typeof schema>
  ) {}

   async ledgerByAccount(account: string, userId: number) {
    const ledgerByAccount = await this.database
      .select()
      .from(schema.journalSchema)
      .where(
        and(
          eq(schema.journalSchema.account, account),
          eq(schema.journalSchema.userId, userId),
        ),
      );

    return {
      account,
      userId,
      entries: ledgerByAccount,
    };
  }
}
