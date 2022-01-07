import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
    @ApiProperty({ example: 'user@gmai.com', description: 'user email adress' })
    readonly email: string;

    @ApiProperty({ example: 'sixthousand', description: 'user name' })
    readonly username: string;

    @ApiProperty({ example: '1234TTT23hsdj', description: 'string password' })
    readonly password: string;
}
