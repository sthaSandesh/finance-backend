import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { DATABASE_CONNECTION } from '../../database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as schema from '../user/schema';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>
  ) {}

  async signup(dto: AuthDto) {
    // 1️⃣ Generate the password hash
    const hash = await argon.hash(dto.password);

    // 2️⃣ Save the new user in the DB
    const [user] = await this.database
      .insert(schema.UserSchema) //insert into the users table.
      .values({
        //pass the data to insert (email + hashed password).
        email: dto.email,
        password: hash, // store hashed password
      })
      .returning(); // returns the inserted row (like RETURNING * in SQL).

    // 3️⃣ Return safe data (exclude password)
    return {
      id: user.id,
      email: user.email,
      //   password: hash
    };
  }

  async signin(dto: AuthDto) {
    // find the user by email
    const [user] = await this.database
      .select()
      .from(schema.UserSchema)
      .where(eq(schema.UserSchema.email, dto.email))
      .limit(1); // ensures only one row

    // if user does not exist throw exception
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // compare password
    const passwordMatches = await argon.verify(user.password, dto.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // send back the user (excluding password)
    return {
      id: user.id,
      email: user.email,
    };
  }
}
