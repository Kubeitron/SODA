/**
 * Certificate for services
 */
export class Certificate {
  uuid: string = '';
  name: string = '';
  hash: string = '';
  notes: string = '';
  tags: String[] = [];
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  expiresAt: Date = new Date();
  createdBy: String = '';
  isPrivate: Boolean = true;
}
