import { ApiProperty } from '@nestjs/swagger';

export class UploadDiagnoseDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  ipfsHash: string;
  @ApiProperty({
    type: String,
    required: true,
    default: '',
  })
  aiDiagnose: string;
}