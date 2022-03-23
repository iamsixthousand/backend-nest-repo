import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Messages } from 'src/@core/strings';

export class ChangeRoleDTO {
    @ApiProperty({ example: 'user1', description: 'username' })
    @IsString({message: Messages.beAString})
    readonly username: string;

    @ApiProperty({ example: '1', description: 'user new role = ADMIN' })
    @IsNumber({}, {message: Messages.beANumber})
    readonly roleId: number;
}
