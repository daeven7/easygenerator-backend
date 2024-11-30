import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  id: string;
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/[A-Za-z]/, { message: 'Password must contain at least one letter' })
  @Matches(/\d/, { message: 'Password must contain at least one number' })
  @Matches(/[\W_]/, {
    message: 'Password must contain at least one special character',
  })
  password: string;
}
