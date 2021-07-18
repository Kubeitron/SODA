/**
 * Certificate for services
 */
export class Certificate {
  public uuid: string = '';
  public name: string = '';
  public hash: string = '';
  public notes: string = '';
  public tags: String[] = [];
  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();
  public expiresAt: Date = new Date();
  public createdBy: String = '';
  public isPrivate: Boolean = true;
}
