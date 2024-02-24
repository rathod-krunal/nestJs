import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { TodosModule } from './todos/todos.module';
import  {MongooseModule} from "@nestjs/mongoose"
@Module({
  imports: [UsersModule,
    MongooseModule.forRoot('mongodb+srv://devilrathod007:Password1@instagram.bwxl60m.mongodb.net/')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
