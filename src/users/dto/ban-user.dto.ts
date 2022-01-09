import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Messages } from 'src/@core/strings';

export class banUserDTO {
    @ApiProperty({ example: 'user1', description: 'username' })
    @IsString({message: Messages.beAString})
    readonly username: string;

    @ApiProperty({ example: 'flaming', description: 'ban reason' })
    @IsString({message: Messages.beAString})
    readonly banReason: string;
}
