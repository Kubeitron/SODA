import ClusterRoute from '~/components/ClusterRoute/ClusterRoute'
import clusters from '~/assets/data/clusters.json'
import encryptionTypes from '~/assets/data/encryptionType.json'
import insecureTraffics from '~/assets/data/insecureTraffic.json'

export default {
  title: 'ClusterRoute',
  component: ClusterRoute,
  args: {
    "uuid": "1149b2dd-1c78-4f37-9481-dd963ee46541",
    "cluster": { "name": "Cola", "uuid": "asd-567"},
    "namespace": "60e6e363",
    "routeName": "Considine Group",
    "routeHost": "mateo.info",
    "certHash": "0x5",
    "wildcard": false,
    "certCreatedOn": new Date("2020-10-10T05:16:04.774Z"),
    "certExpiresOn": new Date("2021-09-07T02:45:00.968Z"),
    "certSans": ["florencio.org", "jamison.net", "lilla.info"],
    "encryptionType": "ReEncrypt",
    "insecureTraffic": "Redirect"
  },
  argTypes: {
    encryptionType: {
      control: {
        type: "select",
        options: encryptionTypes,
      },
      defaultValue: encryptionTypes[0],
    },
    insecureTraffic: {
      control: {
        type: "select",
        options: insecureTraffics,
      },
      defaultValue: insecureTraffics[0],
    },
    cluster: {
      options: clusters.map((cluster) => cluster.name),
      mapping: clusters,
      control: {
        type: "select",
        labels: clusters.map((cluster) => cluster)
      },
      defaultValue: clusters[0],
    },
    certCreatedOn: {
      control: {
        type: "date",
      }
    },
    certExpiresOn: {
      control: {
        type: "date",
      }
    },
  },
};

export const ClusterRouteStory = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <v-expansion-panels><cluster-route
      :uuid="uuid"
      :cluster="() => JSON.parse(cluster)"
      :namespace="namespace"
      :route-name="routeName"
      :route-host="routeHost"
      :wildcard="wildcard"
      :cert-hash="certHash"
      :cert-created-on="certCreatedOn"
      :cert-expires-on="certExpiresOn"
      :certSans="certSans"
      :encryption-type="encryptionType"
      :insecure-traffic="insecureTraffic"
      />
    </v-expansion-panels>
`})