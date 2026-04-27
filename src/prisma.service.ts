import { Injectable, Logger } from '@nestjs/common';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from 'generated/prisma/client';
import { envs } from './config';

@Injectable()
export class PrismaService extends PrismaClient {
    private logger = new Logger('PrismaService');

  constructor() {
    const adapter = new PrismaBetterSqlite3({ url: envs.databaseUrl });
    super({ adapter });

    this.logger.log('Base de datos conectada.')
  }
}