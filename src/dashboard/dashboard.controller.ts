import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('dashboard')
export class DashboardController {
  private logger = new Logger('DashboardController');
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/data')
  getData() {
    this.logger.log('Accessing dashboard data ');
    return 'Welcome To The Application';
  }
}
