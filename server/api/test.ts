export default eventHandler(async () => {
  const user = await db.query.users.findFirst();

  return {
    user,
  };
});
