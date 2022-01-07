import { ApiProperty } from '@nestjs/swagger';

export class ChangeRoleDTO {
  @ApiProperty({ example: 'USER', description: 'user new role' })
  readonly role: string;
}
