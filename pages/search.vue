<template>
  <v-container>
    <v-row class="action-bar">
      <cluster-route-filters
        :cluster-options="options.clusters"
        :namespace-options="allNamespaces"
        :cert-expires-on="certExpiresOn"
        @handle-get-routes="getRoutes">
      </cluster-route-filters>
    </v-row>
    <v-row 
      v-if="hasSearched"
      v-bind:style="{width: '100%'}"
      class="status-bar">
      <v-col cols="2">
        <template v-if="loadingItems">
          <v-icon v-icon>mdi-blur</v-icon>
        </template>
        {{ loadingItems ? '' : visibleItems.length }} Results
      </v-col>
      <v-col cols="10"></v-col>
    </v-row>
    <v-row v-bind:style="{width: '100%'}" class="element-list">
      <v-col>
        <v-expansion-panels>
          <template v-for="(item, index) of visibleItems">
            <cluster-route
              v-if="index < threshold"
              v-bind="item"
              :key="'cluster-route-'+item.uuid">
            </cluster-route>
          </template>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {ClusterRoute} from '~/models/cluster-route';
import { ClusterRouteFilters } from '~/models/cluster-route-filters';
import allItemsConst from "@/assets/routes.json"

export default Vue.extend({
  async asyncData({ $axios }) {

    const source = $axios.CancelToken.source();

    try {
      const options = await $axios.$get('/get-options', {
        cancelToken: source.token
      });

      return { options };

    } catch(error) {
      if ($axios.isCancel(error)) {
        console.log('Request canceled', error)
      } else {
        console.error('Request errored', error)
        // @todo: remove once endpoint is available
        const options = {
          clusters: [
            {name: 'Cola', uuid: 'asd-678'},
            {name: 'Spritzer', uuid: 'asd-567'},
            {name: 'Spritzer DR', uuid: 'asd-456'},
          ]
        };
        return { options };
      }
    }
  
    return { };
  },
  data() {
    const threshold = 100;
    const allItems: ClusterRoute[] = [];
    const allNamespaces: String[] = [];
    allItemsConst.forEach((item: any) => {
      allItems.push({...item, certCreatedOn: new Date(item.certCreatedOn), certExpiresOn: new Date(item.certExpiresOn)})
      allNamespaces.push(item.namespace);
    });
    const visibleItems: ClusterRoute[] = [];
    const hasSearched = false;
    const loadingItems = false;
    return {
      threshold,
      allItems,
      allNamespaces,
      visibleItems,
      hasSearched,
      loadingItems,
      certExpiresOn: null,
    };
  },
  head() {
    return {
      title: "Search"
    };
  },
  methods: {
    getRoutes(filters: ClusterRouteFilters): void {
      this.hasSearched = true;
      this.loadingItems = true;      
      this.visibleItems = this.allItems;
      if (filters.certExpiresOn) {
        this.visibleItems = this.visibleItems.filter((item) => new Date(filters.certExpiresOn || 0).getTime() >= new Date(item.certExpiresOn).getTime());
      }
      if (filters.clusters.length > 0) {
        this.visibleItems = this.visibleItems.filter((item) => filters.clusters.includes(item.cluster));
      }
      if (filters.namespaces.length > 0) {
        this.visibleItems = this.visibleItems.filter((item) => filters.namespaces.includes(item.namespace));
      }
      this.loadingItems = false;
    },
  }
})
</script>
<style>
.v-text-field.v-text-field .v-text-field__details.v-text-field__details {
  margin: 0;
  padding: 0;
  height: 0;
  min-height: 0;
}
</style>
<style>
.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.column-spacer {
  display: flex;
  flex-direction: row;
}
.column-spacer__padding {
  flex: 1;
}
.v-expansion-panels .v-expansion-panel {
  margin-bottom: 4px;
}
.v-expansion-panel-header .v-expansion-panel-header .v-input__control {
    flex-direction: row;
    flex-wrap: nowrap;
}
.v-expansion-panel-content__wrap.v-expansion-panel-content__wrap {
  text-align: left;
}
.v-expansion-panels:not(.v-expansion-panels--accordion):not(.v-expansion-panels--tile) > .v-expansion-panel--active {
  display: block;
  z-index: 1000;
}
.v-input__slot.v-input__slot {
  margin: 0;
}
</style>
