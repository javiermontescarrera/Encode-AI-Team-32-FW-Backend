import { ApiProperty } from '@nestjs/swagger';
import { ethers } from 'ethers';

export class UploadDiagnoseDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  imageName: string;
  @ApiProperty({
    type: String,
    required: true,
    default: null,
  })
  imageContent: any
}

export class GetPatientDiagnosesDto {
  @ApiProperty({
    type: String,
    required: true,
    default: ethers.ZeroAddress,
  })
  patientAddress: string;
}