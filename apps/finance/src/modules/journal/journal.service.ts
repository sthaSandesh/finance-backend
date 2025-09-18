import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { CreateJournal } from './dto/create-journal.dto';
import { and, eq } from 'drizzle-orm';
import { updateJournal } from './dto/update-journal.dti';
import { omitBy, isUndefined } from 'lodash';

@Injectable()
export class JournalService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>
  ) {}

  async journalById(id: number, userId: number) {
    const [journal] = await this.database
      .select()
      .from(schema.journalSchema)
      .where(
        and(
          eq(schema.journalSchema.id, id),
          eq(schema.journalSchema.userId, userId)
        )
      )
      .limit(1); // ensures only one row

    if (!journal) {
      throw new NotFoundException(`Journal with ID ${id} not found`);
    }

    return {
      journal,
    };
  }

  async createjournal(dto: CreateJournal, userId: number) {
    const [journal] = await this.database
      .insert(schema.journalSchema)
      .values({
        userId,
        account: dto.account,
        date: dto.date,
        description: dto.description,
        debit: dto.debit,
        credit: dto.credit,
      })
      .returning();

    return {
      journal,
    };
  }

  async getAllJournals(userId: number) {
    const allJournals = await this.database
      .select()
      .from(schema.journalSchema)
      .where(eq(schema.journalSchema.userId, userId));

    return { allJournals };
  }

  async updateJournal(id: number, userId: number, dto: updateJournal) {
    const updateFieldData = omitBy(dto, isUndefined);
    const [updatedJournal] = await this.database
      .update(schema.journalSchema)
      .set(updateFieldData)
      .where(
        and(
          eq(schema.journalSchema.id, id),
          eq(schema.journalSchema.userId, userId)
        )
      )
      .returning(); // returns updated in row 
 
    if (!updatedJournal) {
      throw new NotFoundException(
        `Journal with ID ${id} not found or you don't have access`
      );
    }

    return updatedJournal;
  }

  async deleteJournal(id: number, userId: number) {
    await this.database
      .delete(schema.journalSchema)
      .where(
        and(
          eq(schema.journalSchema.id, id),
          eq(schema.journalSchema.userId, userId)
        )
      );
      return 'Deleted Sucessfully'
  }
}
