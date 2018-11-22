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
  createRow: async (instanceId, tableId) => {
    // [START bigtable_create_row]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const row = table.row('samplerow');

    const [rowObj, apiResponse] = await row.create();
    // [END bigtable_create_row]
  },

  createRules: async (instanceId, tableId) => {
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_create_rules]
    const row = table.row('samplerow');
    // -
    // Add an increment amount to an existing value, if the targeted cell is
    // unset, it will be treated as containing a zero.
    //
    const rules = [
      {
        column: 'follows:gwashington',
        increment: 1,
      },
    ];

    // -
    // You can also create a rule that will append data to an existing value.
    // If the targeted cell is unset, it will be treated as a containing an
    // empty string.
    //
    // var rules = [
    //   {
    //     column: 'follows:alincoln',
    //     append: ' Honest Abe!',
    //   },
    // ];

    const [apiResponse] = await row.createRules(rules);
    // [END bigtable_create_rules]
  },

  deleteAllCells: async (instanceId, tableId) => {
    // [START bigtable_delete_all_cells]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const row = table.row('samplerow');
    const [apiResponse] = await row.delete();
    // [END bigtable_delete_all_cells]
  },

  deleteCells: async (instanceId, tableId) => {
    // [START bigtable_delete_particular_cells]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const row = table.row('samplerow');

    // Delete selective cell within a family.
    // let cells = [
    //   'follows:gwashington'
    // ];

    // Delete all cells within a family.
    const cells = ['follows'];

    const [apiResponse] = await row.deleteCells(cells);
    // [END bigtable_delete_particular_cells]
  },

  exists: async (instanceId, tableId) => {
    // [START bigtable_row_exists]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const row = table.row('samplerow');

    const [exists] = await row.exists();
    // [END bigtable_row_exists]
  },

  filter: async (instanceId, tableId) => {
    // [START bigtable_row_filter]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const row = table.row('samplerow');

    const filter = [
      {
        family: 'follows',
      },
      {
        column: 'alincoln',
      },
      {
        value: 1,
      },
    ];

    // Optionally, you can pass in an array of entries to be ran in the event
    // that a match is not made.
    const config = {
      onNoMatch: [
        {
          method: 'insert',
          data: {
            follows: {
              jadams: 1,
            },
          },
        },
      ],
    };

    const [matched] = await row.filter(filter, config);
    // [END bigtable_row_filter]
  },

  get: async (instanceId, tableId) => {
    // [START bigtable_get_row]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const row = table.row('samplerow');

    const [rowObj] = await row.get();

    //-
    // Or pass in an array of column names to populate specific cells.
    // Under the hood this will create an interleave filter.
    //-
    // row
    //   .get([
    //     'follows:gwashington',
    //     'follows:alincoln'
    //   ])
    //   .then(result => {
    //     let row = result[0];
    //   })
    //   .catch(err => {
    //     // Handle the error.
    //   });

    // [END bigtable_get_row]
  },

  getMetadata: async (instanceId, tableId) => {
    // [START bigtable_get_row_meta]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const row = table.row('samplerow');

    const [metaData, apiResponse] = await row.getMetadata();
    // [END bigtable_get_row_meta]
  },

  increment: async (instanceId, tableId) => {
    // [START bigtable_row_increment]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const row = table.row('samplerow');

    // Specify a custom amount to increment the column by.
    // row
    //   .increment('follows:gwashington', 2)
    //   .then(result => {
    //     let value = result[0];
    //     let apiResponse = result[1];
    // });

    // To decrement a column, simply supply a negative value.
    // row
    //   .increment('follows:gwashington', -1)
    //   .then(result => {
    //     let value = result[0];
    //     let apiResponse = result[1];
    // });
    const [value, apiResponse] = await row.increment('follows:gwashington');
    // [END bigtable_row_increment]
  },

  save: async (instanceId, tableId) => {
    // [START bigtable_row_save]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const row = table.row('samplerow');
    const entry = {
      follows: {
        jadams: 1,
      },
    };
    const [apiResponse] = await row.save(entry);
    // [END bigtable_row_save]
  },
};

module.exports = snippets;
