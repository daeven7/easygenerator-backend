import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument, User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }
}
