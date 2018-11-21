/**
 * Copyright 2018, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const snippets = {
  createInstance: async (instanceId, clusterId) => {
    // [START bigtable_create_instance]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    // options for a PRODUCTION Instance
    // const options = {
    //   clusters: [
    //     {
    //       name: clusterId,
    //       nodes: 3,
    //       location: 'us-central1-f',
    //       storage: 'ssd',
    //     },
    //   ],
    //   type: 'PRODUCTION', // Optional as default type is PRODUCTION
    // };

    // options for a DEVELOPMENT Instance
    const options = {
      clusters: [
        {
          name: clusterId,
          location: 'us-central1-f',
          storage: 'hdd',
        },
      ],
      type: 'DEVELOPMENT',
    };

    // creates a new Instance
    const [newInstance, operation, apiResponse] = await instance.create(
      options
    );
    // [END bigtable_create_instance]
  },

  createCluster: async (instanceId, clusterId) => {
    // [START bigtable_create_cluster]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    // const options = {
    //   location: 'us-central1-b',
    //   nodes: 3,
    //   storage: 'ssd',
    // };
    const options = {
      location: 'us-central1-b',
      storage: 'hdd',
    };
    const [newCluster, operation, apiResponse] = await instance.createCluster(
      clusterId,
      options
    );
    // [END bigtable_create_cluster]
  },

  createAppProfile: async (instanceId, clusterId, appProfileId, callback) => {
    // [START bigtable_create_app_profile]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const util = require('util');
    const cluster = instance.cluster(clusterId);

    const options = {
      routing: cluster,
      allowTransactionalWrites: true,
      ignoreWarnings: true,
    };
    const instanceAddProfile = util.promisify(instance.createAppProfile);
    const appProfile = await instanceAddProfile(appProfileId, options);
    return callback(appProfile);
    // [END bigtable_create_app_profile]
  },

  createTable: async (instanceId, tableId) => {
    // [START bigtable_create_table]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    const options = {
      families: ['follows'],
    };

    // You can also specify garbage collection rules for your column families.
    // See {@link Table#createFamily} for more information about
    // column families and garbage collection rules.
    //-
    // const options = {
    //   families: [
    //     {
    //       name: 'follows',
    //       rule:  {
    //         age: {
    //           seconds: 0,
    //           nanos: 5000
    //         },
    //         versions: 3,
    //         union: true
    //       }
    //     }
    //   ]
    // };

    const [newTable, apiResponse] = await instance.createTable(
      tableId,
      options
    );
    // [END bigtable_create_table]
  },

  existsInstance: async instanceId => {
    // [START bigtable_exists_instance]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    const [exists] = await instance.exists();
    // [END bigtable_exists_instance]
  },

  getInstance: async instanceId => {
    // [START bigtable_get_instance]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    const [instanceObj, apiResponse] = await instance.get();
    // [END bigtable_get_instance]
  },

  getClusters: async instanceId => {
    // [START bigtable_get_clusters]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    const [clusters] = await instance.getClusters();
    // [END bigtable_get_clusters]
  },

  getAppProfiles: async instanceId => {
    // [START bigtable_get_app_profiles]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    const [appProfiles] = await instance.getAppProfiles();
    // [END bigtable_get_app_profiles]
  },

  getMetadata: async instanceId => {
    // [START bigtable_get_instance_metadata]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    const [metaData] = await instance.getMetadata();
    // [END bigtable_get_instance_metadata]
  },

  getTables: async instanceId => {
    // [START bigtable_get_tables]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    // To control how many API requests are made and page through the results
    // manually, set `autoPaginate` to false.
    const options = {
      autoPaginate: false,
    };
    // const options = {
    //   autoPaginate: true
    // };

    const [tables] = await instance.getTables(options);
    // [END bigtable_get_tables]
  },

  updateInstance: async instanceId => {
    // [START bigtable_set_meta_data]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    const metadata = {
      displayName: 'updated-name',
    };

    const [apiResponse] = await instance.setMetadata(metadata);
    // [END bigtable_set_meta_data]
  },

  delInstance: async instanceId => {
    // [START bigtable_del_instance]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    const [apiResponse] = await instance.delete();
    // [END bigtable_del_instance]
  },
};

module.exports = snippets;
