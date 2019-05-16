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
  create: async (instanceId, clusterId) => {
    // [START bigtable_create_cluster]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const cluster = instance.cluster(clusterId);

    const [clusterInstance, operation, apiResponse] = await cluster.create();
    // [END bigtable_create_cluster]
  },

  delete: async (instanceId, clusterId) => {
    // [START bigtable_delete_cluster]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const cluster = instance.cluster(clusterId);

    const [apiResponse] = await cluster.delete();
    // [END bigtable_delete_cluster]
  },

  exists: async (instanceId, clusterId) => {
    // [START bigtable_exists_cluster]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const cluster = instance.cluster(clusterId);

    const [exists] = await cluster.exists();
    // [END bigtable_exists_cluster]
  },

  get: async (instanceId, clusterId) => {
    // [START bigtable_get_cluster]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const cluster = instance.cluster(clusterId);

    const [clusterResponse, apiResponse] = await cluster.get();
    // [END bigtable_get_cluster]
  },

  getMeta: async (instanceId, clusterId) => {
    // [START bigtable_cluster_get_meta]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const cluster = instance.cluster(clusterId);

    const [metadata, apiResponse] = await cluster.getMetadata();
    // [END bigtable_cluster_get_meta]
  },

  setMeta: async (instanceId, clusterId) => {
    // [START bigtable_cluster_set_meta]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const cluster = instance.cluster(clusterId);

    const metadata = {
      nodes: 4,
    };

    const [operation, apiResponse] = await cluster.setMetadata(metadata);
    // [END bigtable_cluster_set_meta]
  },
};

module.exports = snippets;
