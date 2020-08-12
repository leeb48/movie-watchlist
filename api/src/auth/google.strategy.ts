/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { OAuthConfig } from './config/oauth.config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {
    super(OAuthConfig);
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<void> {
    // Profile retrieved from google
    const { name, emails } = profile;
    const firstName = name.givenName;
    const lastName = name.familyName;
    const email = emails[0].value;

    // Check if user already exists in the DB
    let user = await this.userRepo.findOne({ username: email });

    // If user does not exists, register the user
    if (!user) {
      user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.username = email;
      user.password = '';
      user.salt = '';

      await user.save();
    }

    done(null, user);
  }
}
