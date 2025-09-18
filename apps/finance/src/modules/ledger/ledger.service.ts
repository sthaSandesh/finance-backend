import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../journal/schema'

@Injectable()
export class LedgerService {
    constructor(@Inject(DATABASE_CONNECTION) private database :NodePgDatabase <typeof schema>){
        
    }
}
