import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import * as HRDiagnoseJson from './assets/HRDiagnose.json';
import { PinataPinOptions } from '@pinata/sdk';
// import { createReadStream } from 'fs';
const pinataSDK = require('@pinata/sdk');

@Injectable()
export class AppService {
  hrDiagnoseContract: ethers.Contract;
  provider: ethers.Provider;
  wallet: ethers.Wallet;
  // pinata: pinataSDK;

  constructor(private configService: ConfigService) {
    this.provider = new ethers.JsonRpcProvider(
      this.configService.get<string>(
        'RPC_ENDPOINT_URL',
        process.env.RPC_ENDPOINT_URL,
      ),
    );
    this.wallet = new ethers.Wallet(
      this.configService.get<string>(
        'PRIVATE_KEY',
        process.env.PRIVATE_KEY || 'f'.repeat(64),
      ),
      this.provider,
    );

    this.hrDiagnoseContract = new ethers.Contract(
      this.configService.get<string>(
        'HRDIAGNOSE_CT_ADDR',
        process.env.HRDIAGNOSE_CT_ADDR || ethers.ZeroAddress,
      ),
      HRDiagnoseJson.abi,
      this.wallet,
    );

    // this.setPinataSDK();
  }

  // async setPinataSDK() {
  //   this.pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_KEY);
  // }

  getHello(): string {
    return 'Main Backend App Running OK. Go to .../api/ for more!';
  }

  async getBlockNumber() {
    const { provider } = this;
    const blkNum = await provider.getBlockNumber();
    const lastBlkNum = blkNum | 0;
    return lastBlkNum;
  }

  async getContractAddress() {
    try {
      return this.hrDiagnoseContract.target.toString();
    } catch (e) {
      return new BadRequestException('Err:WrongCt', e);
    }
  }

  async getContractAbi() {
    return HRDiagnoseJson.abi;
  }

  async uploadDiagnose(args: any) {
    if (Object.keys(args).length > 2) {
      return new BadRequestException('Err:TooManyArgs');
    }
    let { imageName, imageContent } = args;

    const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_KEY);

    // const src = "./DivineMercy.jpeg";
    // imageContent = createReadStream(src);
    
    const options: PinataPinOptions = {
        pinataMetadata: {
            name: imageName,
        },
        pinataOptions:{
            cidVersion: 0,
        }
    }

    pinata.pinFileToIPFS(imageContent, options).then((result) => {
        console.log(result);
        return result;
    }).catch((err) => {
        console.error(err);
    });
  }

  async getPatientDiagnoses(args: any) {
    if (Object.keys(args).length > 1) {
      return new BadRequestException('Err:TooManyArgs');
    }
    const { patientAddress } = args;
    try {
      return this.hrDiagnoseContract.getPatientDiagnoses(patientAddress);
    } catch (e) {
      return new BadRequestException('Err:WrongCt', e);
    }
  }

}
