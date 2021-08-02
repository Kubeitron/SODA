/**
 * Route on the cluster
 */
export class ClusterRoute {
  uuid: string = '';
  namespace: string = '';
  routeName: string = '';
  routeHost: string = '';
  certHash: string = '';
  certCreatedOn: Date = new Date();
  certExpiresOn: Date = new Date();
  certSans: Array<String> = [];
  wildcard: string = '';
  encryptionType: String = '';
  insecureTraffic: String = '';
}
