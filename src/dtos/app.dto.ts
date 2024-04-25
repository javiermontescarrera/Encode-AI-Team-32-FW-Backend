import { ApiProperty } from '@nestjs/swagger';
import { ethers } from 'ethers';
import { ReadStream } from 'fs';

export class IPFSUploadDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  imageName: string;
  @ApiProperty({
    type: ReadStream,
    required: true,
    default: null,
  })
  imageContent: ReadStream
}

export class RecordDiagnoseDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  ipfsHash: string;
  @ApiProperty({
    type: String,
    required: true,
    default: "",
  })
  aiDiagnose: string
}

export class GetPatientDiagnosesDto {
  @ApiProperty({
    type: String,
    required: true,
    default: ethers.ZeroAddress,
  })
  patientAddress: string;
}

export class GetDiagnoseDetailsDto {
  @ApiProperty({
    type: String,
    required: true,
    default: "",
  })
  diagnoseHash: string;
}

// export class CallPythonDto {
//   @ApiProperty({
//     type: String,
//     required: true,
//     default: "",
//   })
//   imageFileName: string;
// }