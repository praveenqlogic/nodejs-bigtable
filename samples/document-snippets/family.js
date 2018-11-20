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
  createColmFamily: async (instanceId, tableId, familyId) => {
    // [START bigtable_create_family]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    const family = table.family(familyId);

    const [familyResponse,apiResponse] = await family
      .create();
    // [END bigtable_create_family]
  },
  existsFamily: async (instanceId, tableId, familyId) => {
    // [START bigtable_exists_family]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    const family = table.family(familyId);

    const [exists] = await family
      .exists();
    // [END bigtable_exists_family]
  },
  getFamily: async (instanceId, tableId, familyId) => {
    // [START bigtable_get_family]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    const family = table.family(familyId);

    const [familyResponse,apiResponse] = await family
      .get();
    // [END bigtable_get_family]
  },
  getMetadata: async (instanceId, tableId, familyId) => {
    // [START bigtable_get_family_meta]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    const family = table.family(familyId);

    const [metaData,apiResponse] = await family
      .getMetadata();
    // [END bigtable_get_family_meta]
  },
  setMetadata: async (instanceId, tableId, familyId) => {
    // [START bigtable_set_family_meta]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    const family = table.family(familyId);

    const metadata = {
      rule: {
        versions: 2,
        union: true,
      },
    };

    const [apiResponse] = await family
      .setMetadata(metadata);
    // [END bigtable_set_family_meta]
  },
  delFamily: async (instanceId, tableId, familyId) => {
    // [START bigtable_del_family]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    const family = table.family(familyId);

    const [apiResponse] = await family
      .delete();
    // [END bigtable_del_family]
  },
};

module.exports = snippets;
