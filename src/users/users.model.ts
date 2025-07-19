import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

// 1. The class representing a User (decorated for NestJS)
@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  // Optional method, not stored in MongoDB
  comparePassword?: (inputPassword: string) => Promise<boolean>;
}

// 2. Type alias combining the class and Mongoose's Document
export type UserDocument = User & Document;

// 3. Create the actual Mongoose schema
export const UserSchema = SchemaFactory.createForClass(User);

// 4. Method for comparing passwords
UserSchema.methods.comparePassword = async function (inputPassword: string): Promise<boolean> {
  return await bcrypt.compare(inputPassword, this.password);
};

// 5. Pre-save hook to hash password before saving
UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});
