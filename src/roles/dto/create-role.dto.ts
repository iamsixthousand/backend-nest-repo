import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDTO {
    @ApiProperty({ example: 'ADMIN', description: 'user role name' })
    readonly value: string;

    @ApiProperty({
        example: 'full access',
        description: 'access level description',
    })
    readonly description: string;
}
