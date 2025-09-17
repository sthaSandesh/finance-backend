import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>
  ) {}

  async getUser() {
    //help to retrive userdata from database
    return this.database.query.UserSchema.findMany();
  }

  //this is func   parameterType dbTable define in schema like user define in schema  
  async CreateUser(user: typeof schema.UserSchema.$inferInsert) {  // inferIsert figure out what fiel are required when inserting into table 
    await this.database.insert(schema.UserSchema).values(user); // says “I want to insert into the users table”.
  }
}
