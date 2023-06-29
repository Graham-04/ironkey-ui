export const load = async () => {
  try {
    let users = await fetch("http://127.0.0.1:8080/users?offset=0", {
      method: "GET",
    });
    users = await users.json();
    console.log(users);
    return users;
  } catch {
    return {
      users: null,
    };
  }
};
