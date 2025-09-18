import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateJournal {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  account: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  debit: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  credit: number;


}
