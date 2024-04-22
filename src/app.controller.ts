import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import {
  UploadDiagnoseDto,
} from './dtos/app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/block-number')
  async getBlockNumber() {
    return await this.appService.getBlockNumber();
  }

  @Get('/contract-address')
  async getContractAddress() {
    return { result: await this.appService.getContractAddress() };
  }

  @Get('/contract-abi')
  async getContractAbi() {
    return { result: await this.appService.getContractAbi() };
  }

  @Post('/set-tracker-contract-address')
  async uploadDiagnose(@Body() body: UploadDiagnoseDto) {
    return { result: await this.appService.uploadDiagnose(body) };
  }

}
