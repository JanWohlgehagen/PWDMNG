import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';

import { VaultService } from './vault.service';
import { JwtAuthGuard } from './vault.guard';

@Controller('vault')
export class VaultController {
  constructor(private vaultService: VaultService) {}

  @UseGuards(JwtAuthGuard)
  @Post('store')
  async storeqqqPassword(@Request() req, @Body() body) {
    const { website, username, encryptedPassword, iv } = body;
    return this.vaultService.storePassword(
      req.user.userId,
      website,
      username,
      encryptedPassword,
      iv,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('retrieve')
  async retrievePasswords(@Request() req) {
    return this.vaultService.retrievePasswords(req.user.userId);
  }
}
