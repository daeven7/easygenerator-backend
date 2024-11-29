import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument, User } from './schemas/user.schema';
import { Model } from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto): Promise<UserDocument> {
    // return 'This action adds a new user';
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async findByUsername(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username }).exec();
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
