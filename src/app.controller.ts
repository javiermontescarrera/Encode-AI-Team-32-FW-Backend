import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  UseInterceptors, 
  UploadedFile, 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AppService } from './app.service';
import { createReadStream } from 'fs';
import {
  IPFSUploadDto,
  RecordDiagnoseDto,
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

  // @Post('/generate-image')
  // async generateDiagnose(@Body() body: GenerateDiagnoseDto) {
  //   return { result: await this.appService.uploadDiagnose(body) };
  // }

  // @Post('/upload-image')
  // async uploadImage(@Body() body: UploadImageDto) {
  //   return { result: await this.appService.uploadImage(body) };
  // }

  @Post('/record-diagnose')
  async recordDiagnose(@Body() body: RecordDiagnoseDto) {
    return { result: await this.appService.recordDiagnose(body) };
  }

  @Post('/get-patient-diagnoses')
  async getPatientDiagnoses(@Body() body: GetPatientDiagnosesDto) {
    return { result: await this.appService.getPatientDiagnoses(body) };
  }

  @Post('/get-diagnose-details')
  async getDiagnoseDetails(@Body() body: GetDiagnoseDetailsDto) {
    return { result: await this.appService.getDiagnoseDetails(body) };
  }

  @Post('/upload-image')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix =
          Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
  }))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    // console.log(file);
    const ipfsDto = new IPFSUploadDto();
    ipfsDto.imageName=file.filename;
    ipfsDto.imageContent=createReadStream(`./uploads/${file.filename}`);

    try {
      const ipfsResponse = await this.appService.ipfsUpload(ipfsDto);
      // console.log(ipfsResponse);


      // const blockchainRecordDto = new RecordDiagnoseDto();
      // blockchainRecordDto.ipfsHash = ipfsResponse.IpfsHash;
      // blockchainRecordDto.aiDiagnose = "";
      // console.log(`blockchainRecordDto: ${JSON.stringify(blockchainRecordDto)}`);
      // const recordResponse = await this.appService.recordDiagnose(blockchainRecordDto);

      return { result: ipfsResponse };
    } catch (error) {
      console.error(error);
    }
    
  }
}
