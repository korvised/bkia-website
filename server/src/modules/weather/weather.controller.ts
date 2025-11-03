import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weather: WeatherService) {}

  /**
   * Single language (fast path)
   * GET /weather?q=Tonpheung,LA&lang=lo
   */
  @Get()
  async getWeather(
    @Query('q') q = 'Tonpheung,LA',
    @Query('lang') lang?: string,
  ) {
    return this.weather.getWeather(q, lang);
  }
}
