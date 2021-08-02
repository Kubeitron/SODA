/**
 * Route on the cluster
 */
export class ClusterRoute {
  uuid: string = '';
  cluster: string = '';
  namespace: string = '';
  routeName: string = '';
  routeHost: string = '';
  certHash: string = '';
  certCreatedOn: Date = new Date();
  certExpiresOn: Date = new Date();
  certSans: Array<String> = [];
  wildcard: boolean = false;
  encryptionType: String = '';
  insecureTraffic: String = '';
}
