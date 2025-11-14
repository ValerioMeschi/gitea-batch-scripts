/// CAREFUL this will delete all users not in the allowed list

let allowed = ["username1", "username2"];
let baseURL = "https://git.mydomain.com";
let username = "username";
let password = "password";
let confirmDelete = false;

async function deleteAllUsers() {
  users = await getUsers();
  if (!confirmDelete) {
    console.log("USERS:");
    console.log(users);
    console.log("Please set confirmDelete to true to delete users");
    return;
  }

  users.forEach((user) => {
    if (!allowed.includes(user.username) && confirmDelete) {
      deleteUser(user.username, username, password);
    }
  });
}

deleteAllUsers();

async function getUsers() {
  const url = new URL(`${baseURL}/api/v1/admin/users`);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization:
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
    },
  });

  if (!response.ok) {
    console.log(
      `Failed to get users: ${response.status} ${response.statusText}`,
    );
    return [];
  }
  let res = await response.json();
  return res;
}

async function deleteUser(targetUsername, authUser, authPass) {
  const url = new URL(
    `${baseURL}/api/v1/admin/users/${encodeURIComponent(targetUsername)}`,
  );
  url.searchParams.set("purge", "true");

  const response = await fetch(url.toString(), {
    method: "DELETE",
    headers: {
      Authorization:
        "Basic " + Buffer.from(`${authUser}:${authPass}`).toString("base64"),
    },
  });

  if (!response.ok) {
    console.log(
      `Failed to delete user "${targetUsername}": ${response.status} ${response.statusText}`,
    );
    return;
  }
  let res = await response;
  console.log(`Deleted user ${targetUsername}`);
  return await response; // or simply `return true;` if no body is needed
}
