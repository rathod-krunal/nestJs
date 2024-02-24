import { Injectable } from "@nestjs/common";
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
      // You might want to attempt reconnection here
    });
  }

  async create(CreateUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.userModel(CreateUserDto);
    return createUser.save()
  }

  async update(id:string, UpdateUserDto: UpdateUserDto) : Promise<User> {
    return this.userModel.findByIdAndUpdate(id,UpdateUserDto,{new:true})
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id:string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
  }