
# Delete‑All‑Users

A tiny Node.js script that removes all your bot/spam Gitea users that are **not** on an allow‑list.

> **⚠️ Warning**
> This script **permanently deletes** users and **all their data**. Make sure you understand before nuking your install

---

## Prerequisites

- nodejs (18.x or newer)

---

## Installation

```bash
# Clone the repository (or copy the file to a folder)
git clone https://github.com/your‑repo/delete‑all‑users.git
cd delete‑all‑users
```

---

## Configuration

Open the script (default name: `deleteAllUsers.js`) and set the following variables:

```js
let allowed = ["username1", "username2"];          // users that will NOT be deleted
let baseURL = "https://git.mydomain.com";           // your Git instance
let username = "admin";                            // admin credentials
let password = "secret";
let confirmDelete = false;                         // **set to true to enable deletion**
```

---

## Run

```bash
node deleteAllUsers.js
```

The script will:

1. Fetch all users from the Git API.
2. Print the user list if `confirmDelete` is `false`.
3. Delete every user *not* present in `allowed` when `confirmDelete` is `true`.


this will nuke your entire Gitea instance if you're not looking.
