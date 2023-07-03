const d = async (id) => {
  let result = await fetch(`http://127.0.0.1:8080/user?id=${id}`, {
    method: "DELETE",
  });

  if (result.ok) {
    return true;
  }
  return false;
};

export const deleteUser = async ({ userId = undefined, users = undefined }: { userId?: string | undefined; users: string[] | undefined }) => {
  if (users) {
    users.forEach(async (id) => {
      let result = await d(id);
      if (!result) {
        console.error("Could not delete user: ", id);
      }
    });
    return true;
  } else if (userId) {
    let result = await d(userId);

    if (!result) {
      console.error("Could not delete user: ", id);
    }
    return true;
  } else {
    return false;
  }
};
