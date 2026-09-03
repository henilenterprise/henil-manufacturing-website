// A minimal fake Supabase client implementing only the query-builder
// surface this project's code actually calls (.from().insert().select()
// .limit(), .from().select().eq().limit(), .storage.from().upload()).
//
// This is NOT a Supabase mock library and doesn't attempt to replicate
// Postgres semantics (constraints, RLS, etc.) — it exists so the real
// business logic in inquiry.service.js and storage.service.js can be
// exercised without a network call, proving THAT logic is correct. It
// does not, and cannot, prove that a real Supabase project accepts the
// same calls — only an actual project with real credentials can prove
// that. See database/README.md and the root README's RFQ section for
// where the honest line between "verified" and "assumed" sits.
import crypto from "node:crypto";

class FakeQueryBuilder {
  constructor(store, table) {
    this.store = store;
    this.table = table;
    this._mode = null;
    this._insertRows = null;
    this._filters = [];
    this._limit = null;
  }

  insert(rows) {
    this._mode = "insert";
    this._insertRows = Array.isArray(rows) ? rows : [rows];
    return this;
  }

  select() {
    if (this._mode !== "insert") this._mode = "select";
    return this;
  }

  eq(column, value) {
    this._filters.push([column, value]);
    return this;
  }

  limit(n) {
    this._limit = n;
    return this;
  }

  then(resolve, reject) {
    return this._execute().then(resolve, reject);
  }

  async _execute() {
    if (this._mode === "insert") {
      const table = this.store[this.table] || (this.store[this.table] = []);
      const inserted = this._insertRows.map((r) => ({ id: crypto.randomUUID(), ...r }));
      table.push(...inserted);
      const limited = this._limit ? inserted.slice(0, this._limit) : inserted;
      return { data: limited, error: null };
    }
    if (this._mode === "select") {
      let rows = this.store[this.table] || [];
      for (const [col, val] of this._filters) {
        rows = rows.filter((r) => r[col] === val);
      }
      if (this._limit) rows = rows.slice(0, this._limit);
      return { data: rows, error: null };
    }
    return { data: null, error: { message: "unsupported operation in fake client" } };
  }
}

export function createFakeSupabaseClient(seed = {}) {
  const store = JSON.parse(JSON.stringify(seed));
  const storageUploads = [];

  return {
    from(table) {
      return new FakeQueryBuilder(store, table);
    },
    storage: {
      from(bucket) {
        return {
          async upload(objectPath, buffer, opts) {
            storageUploads.push({ bucket, path: objectPath, size: buffer.length, contentType: opts?.contentType });
            return { data: { path: objectPath }, error: null };
          },
          async createSignedUrl(objectPath, expiresInSeconds) {
            return {
              data: { signedUrl: `https://fake-supabase.local/storage/v1/object/sign/${bucket}/${objectPath}?expires=${expiresInSeconds}` },
              error: null,
            };
          },
        };
      },
    },
    _store: store,
    _storageUploads: storageUploads,
  };
}

/** A client whose every operation fails, for testing error handling. */
export function createFailingSupabaseClient(message = "simulated network failure") {
  return {
    from() {
      return {
        insert() { return this; },
        select() { return this; },
        eq() { return this; },
        limit() { return this; },
        then(resolve) { return Promise.resolve({ data: null, error: { message } }).then(resolve); },
      };
    },
    storage: {
      from() {
        return {
          async upload() { return { data: null, error: { message } }; },
          async createSignedUrl() { return { data: null, error: { message } }; },
        };
      },
    },
  };
}
