import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./userInterface/userInterFace";
import { CreateUserDto } from "./Dtos/Create-User-dto";
import { UpdateUserDto } from "./Dtos/Update-User-Dto";
import mongoose from "mongoose";

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    this.connectToDatabase();
  }

  private connectToDatabase() {
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Failed to connect to MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Disconnected from MongoDB');
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createUser = new this.userModel(createUserDto);
      return await createUser.save();
    } catch (error) {
      throw new NotFoundException('Failed to create user');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {

    try {
      const user = await this.userModel.findById(id).exec();
      if(!user) {
        throw new NotFoundException('User Not Found');
      }
      return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    } catch (error) {
      throw new NotFoundException('Failed to update user');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new NotFoundException('Failed to retrieve users');
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new NotFoundException('Failed to retrieve user');
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndDelete(id);
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new NotFoundException('Failed to delete user');
    }
  }
}
