import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  ParseIntPipe,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JournalService } from './journal.service';
import { CreateJournal } from './dto/create-journal.dto';
import { AuthGuard } from '@nestjs/passport';
import { updateJournal } from './dto/update-journal.dti';

@Controller('journal')
export class JournalController {
  constructor(private journalService: JournalService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  journalById(@Req() req, @Param('id', ParseIntPipe) id: number) {
    return this.journalService.journalById(id, req.user.id);
  }

  @UseGuards(AuthGuard('jwt')) // ensures req.user is populated
  @Post()
  createJournal(@Body() dto: CreateJournal, @Req() req) {
    const userId = req.user.id; // populated from JWT payload
    return this.journalService.createjournal(dto, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getalljournals')
  getAllJournals(@Req() req) {
    return this.journalService.getAllJournals(req.user.id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateJournal(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: updateJournal,
    @Req() req
  ) {
    const userId = req.user.id;
    return this.journalService.updateJournal(id, userId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteJournalById(@Req() req, @Param('id', ParseIntPipe) id: number) {
    return this.journalService.deleteJournal(id, req.user.id);
  }
}

