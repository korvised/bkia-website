import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@/common/config';
import { RedisService } from '@/common/redis';
import { normalizeLang } from '@/types/language';
import { OpenWeatherResponse } from '@/types/weather';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly ttlSeconds: number;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
    private readonly redis: RedisService,
  ) {
    this.apiKey = '4c0b9b9439b2925eb94fad1871f70428';
    this.ttlSeconds = Number(600);
  }

  private cacheKey(q: string, lang: string) {
    return `weather:${q.toLowerCase()}:${lang.toLowerCase()}`;
  }

  async getWeather(q: string, lang?: string): Promise<OpenWeatherResponse> {
    const units = 'metric';
    const L = normalizeLang(lang);
    const key = this.cacheKey(q, L);
    const cached = await this.redis.getJSON<OpenWeatherResponse>(key);
    if (cached) return cached;

    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const { data } = await firstValueFrom(
      this.http.get<OpenWeatherResponse>(url, {
        params: { q, appid: this.apiKey, units, lang: L },
        timeout: 8000,
      }),
    );

    await this.redis.setJSON(key, data, this.ttlSeconds);
    return data;
  }
}
