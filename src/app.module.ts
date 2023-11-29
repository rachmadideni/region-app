import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvinceModule } from './province/province.module';
import { config } from 'process';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from './province/entities/province.entity';
import { DistrictModule } from './district/district.module';
import { CityModule } from './city/city.module';
import { CitytipeModule } from './citytipe/citytipe.module';
import { Citytipe } from './citytipe/entities/citytipe.entity';
import { City } from './city/entities/city.entity';
import { District } from './district/entities/district.entity';
import { SubdistrictModule } from './subdistrict/subdistrict.module';
import { SubdistricttypeModule } from './subdistricttype/subdistricttype.module';
import { Subdistricttype } from './subdistricttype/entities/subdistricttype.entity';
import { Subdistrict } from './subdistrict/entities/subdistrict.entity';
import { ApikeyModule } from './apikey/apikey.module';
import { Apikey } from './apikey/entities/apikey.entity';
import { ApiConsumer } from './apikey/entities/apiconsumer.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
      entities: [
        Province,
        Citytipe,
        City,
        District,
        Subdistricttype,
        Subdistrict,
        Apikey,
        ApiConsumer,
      ],
      autoLoadEntities: false,
      synchronize: true,
      extra: {
        namedParameters: true,
        namedPlacholders: true,
      },
      // debug: true,
    }),
    ProvinceModule,
    DistrictModule,
    CityModule,
    CitytipeModule,
    SubdistrictModule,
    SubdistricttypeModule,
    SubdistrictModule,
    ApikeyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
