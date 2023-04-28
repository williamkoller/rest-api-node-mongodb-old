import { Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class BcryptAdapter {
  public async hash(plaintext: string) {
    return hashSync(plaintext, genSaltSync());
  }

  public async comparer(plaintext: string, digest: string) {
    return compareSync(plaintext, digest);
  }
}
