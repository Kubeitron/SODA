<template>
  <v-expansion-panel>
    <v-expansion-panel-header v-slot="{ open }">
      <v-row no-gutters>
        <v-col cols="4">
          {{ namespace }}
        </v-col>
        <v-col
          cols="8"
          class="text--secondary">
          <v-fade-transition leave-absolute>
            <span v-if="open">Certificate Details</span>
            <v-row
              v-else
              no-gutters
              style="width: 100%">
              <v-col cols="6">
                <b>Created On:</b> {{ certCreatedOn || 'Not set' }}
              </v-col>
              <v-col cols="6">
                <b>Expires On:</b> {{ certExpiresOn || 'Not set' }}
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>  
      <v-row justify="start">
        <v-col class="d-flex flex-row">
          <div class="text-left">
            <b>UUID</b> 
            <div>{{uuid}}</div>
          </div> 
          <template v-for="(tag, index) in [encryptionType ,insecureTraffic]">
            <v-chip
              :key="'tag-'+uuid+index"
              class="ma-2"
              color="primary">
              {{ tag }}
            </v-chip>
          </template>
        </v-col>
      </v-row>
      <v-row justify="start">
        <v-col class="text-left">
          <b>Certificate Hash</b> 
          <div>{{ certHash }}</div>
        </v-col> 
      </v-row>
      <v-row justify="start">
        <v-col class="text-left">
          <b>Route</b> 
          <div>{{ routeName }} {{ routeHost }}</div>
        </v-col> 
      </v-row>    
      <v-row>
        <v-col class="text-left">
          <b>Created On</b> 
          <div>{{ certCreatedOn }}</div>
        </v-col>
        <v-col class="text-left">
          <b>Expires On</b> 
          <div>{{ certExpiresOn }}</div>
        </v-col> 
      </v-row>            
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'cluster-route',
  props: {
    uuid: {
      type: String,
      required: true
    },
    namespace: {
      type: String,
      required: true
    },
    routeName: {
      type: String,
      required: true
    },
    routeHost: {
      type: String,
      required: true
    },
    certHash: {
      type: String,
      required: true
    },
    certCreatedOn: {
      type: Date,
      required: true
    },
    certExpiresOn: {
      type: Date,
      required: true
    },
    CertSans: {
      type: Array,
      required: true
    },
    Wildcard: {
      type: Boolean,
      required: true
    },
    encryptionType: {
      type: String,
      required: true
    },
    insecureTraffic: {
      type: String,
      required: true
    },
  }
})
</script>