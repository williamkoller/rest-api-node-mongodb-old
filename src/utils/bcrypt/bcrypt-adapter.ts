import { Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class BcryptAdapter {
  public async hash(plaintext: string) {
    const salt = 12;
    return hashSync(plaintext, salt);
  }

  public async comparer(plaintext: string, digest: string) {
    return compareSync(plaintext, digest);
  }
}
