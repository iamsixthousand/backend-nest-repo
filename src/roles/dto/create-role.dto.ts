import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Messages } from 'src/@core/strings';

export class CreateRoleDTO {
    @ApiProperty({ example: 'ADMIN', description: 'user role name' })
    @IsString({message: Messages.beAString})
    readonly value: string;

    @ApiProperty({
        example: 'full access',
        description: 'access level description',
    })
    @IsString({message: Messages.beAString})
    readonly description: string;
}
