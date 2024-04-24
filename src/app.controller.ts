import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import {
  UploadDiagnoseDto,
  GetPatientDiagnosesDto,
  GetDiagnoseDetailsDto,
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

  @Post('/upload-diagnose')
  async uploadDiagnose(@Body() body: UploadDiagnoseDto) {
    return { result: await this.appService.uploadDiagnose(body) };
  }

  @Post('/get-patient-diagnoses')
  async getPatientDiagnoses(@Body() body: GetPatientDiagnosesDto) {
    return { result: await this.appService.getPatientDiagnoses(body) };
  }

  @Post('/get-diagnose-details')
  async getDiagnoseDetails(@Body() body: GetDiagnoseDetailsDto) {
    return { result: await this.appService.getDiagnoseDetails(body) };
  }

}
