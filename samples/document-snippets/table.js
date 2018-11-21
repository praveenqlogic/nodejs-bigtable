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
  createTable: async (instanceId, tableId) => {
    // [START bigtable_create_table]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();

    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const [tableResponse, apiResponse] = await table.create();
    // [END bigtable_create_table]
  },

  existsTable: async (instanceId, tableId) => {
    // [START bigtable_exists_table]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const [exists] = await table.exists();
    // [END bigtable_exists_table]
  },

  getTable: async (instanceId, tableId) => {
    // [START bigtable_get_table]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const [tableResponse, apiResponse] = await table.get();
    // [END bigtable_get_table]
  },

  getMetadata: async (instanceId, tableId) => {
    // [START bigtable_get_table_meta]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const [metaData] = await table.getMetadata();
    // [END bigtable_get_table_meta]
  },

  createFamily: async (instanceId, tableId, familyId) => {
    // [START bigtable_create_family]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const options = {};
    // options.rule = {
    //   age: {
    //     seconds: 0,
    //     nanos: 5000
    //   },
    //   versions: 3,
    //   union: true
    // };

    const [family, apiResponse] = await table.createFamily(familyId, options);
    // [END bigtable_create_table]
  },

  getFamilies: async (instanceId, tableId) => {
    // [START bigtable_get_families]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const [families, apiResponse] = await table.getFamilies();
    // [END bigtable_get_families]
  },

  insertRows: async (instanceId, tableId) => {
    // [START bigtable_insert_rows]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const entries = [
      {
        key: 'alincoln',
        data: {
          follows: {
            gwashington: 1,
          },
        },
      },
    ];

    const [apiResponse] = await table.insert(entries);
    // [END bigtable_insert_rows]
  },

  getRows: async (instanceId, tableId) => {
    // [START bigtable_get_rows]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const options = {
      keys: ['alincoln', 'gwashington'],
    };
    const [rows] = await table.getRows(options);
    // [END bigtable_get_rows]
  },

  mutate: async (instanceId, tableId) => {
    // [START bigtable_mutate_rows]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const entries = [
      {
        method: 'delete',
        key: 'alincoln',
      },
    ];
    await table.mutate(entries);
    // [END bigtable_mutate_rows]
  },

  createReadStream: (instanceId, tableId) => {
    // [START bigtable_table_readstream]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    table
      .createReadStream()
      .on('error', err => {
        // Handle the error.
      })
      .on('data', function(row) {
        // `row` is a Row object.
      })
      .on('end', function() {
        // All rows retrieved.
      });
    //-
    // If you anticipate many results, you can end a stream early to prevent
    // unnecessary processing.
    //-
    // table
    //   .createReadStream()
    //   .on('data', function (row) {
    //     this.end();
    //   });

    //-
    // Specify arbitrary keys for a non-contiguous set of rows.
    // The total size of the keys must remain under 1MB, after encoding.
    //-
    // table.createReadStream({
    //   keys: [
    //     'alincoln',
    //     'gwashington'
    //   ]
    // });

    //-
    // Scan for row keys that contain a specific prefix.
    //-
    // table.createReadStream({
    //   prefix: 'gwash'
    // });

    //-
    // Specify a contiguous range of rows to read by supplying `start` and `end`
    // keys.
    //
    // If the `start` key is omitted, it is interpreted as an empty string.
    // If the `end` key is omitted, it is interpreted as infinity.
    //-
    // table.createReadStream({
    //   start: 'alincoln',
    //   end: 'gwashington'
    // });

    //-
    // Specify multiple ranges.
    //-
    // table.createReadStream({
    //   ranges: [{
    //     start: 'alincoln',
    //     end: 'gwashington'
    //   }, {
    //     start: 'tjefferson',
    //     end: 'jadams'
    //   }]
    // });

    //-
    // Apply a {@link Filter} to the contents of the specified rows.
    //-
    // table.createReadStream({
    //   filter: [
    //     {
    //       column: 'gwashington'
    //     }, {
    //       value: 1
    //     }
    //   ]
    // });
    //
    // [END bigtable_table_readstream]
  },

  sampleRowKeys: async (instanceId, tableId) => {
    // [START bigtable_sample_row_keys]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const [sampleRKeys] = await table.sampleRowKeys();
    // [END bigtable_sample_row_keys]
  },

  delRows: async (instanceId, tableId) => {
    // [START bigtable_del_rows]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const [apiResponse] = await table.deleteRows('alincoln');
    // [START bigtable_del_rows]
  },

  delTable: async (instanceId, tableId) => {
    // [START bigtable_del_table]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const [apiResponse] = await table.delete();
    // [END bigtable_del_table]
  },
};

module.exports = snippets;
