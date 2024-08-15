import { eq } from "drizzle-orm";
import { users } from "~~/drizzle/schema";

export default oauthGoogleEventHandler({
  async onSuccess(event, { user }) {
    let userRecord = await db.query.users.findFirst({
      where: eq(users.sub, user.sub),
      columns: { id: true, fullName: true },
    });

    if (!userRecord) {
      [userRecord] = await db
        .insert(users)
        .values({
          sub: user.sub,
          fullName: user.name,
          email: user.email,
        })
        .returning({ id: users.id, fullName: users.fullName });
    }

    await setUserSession(event, {
      user: {
        id: userRecord.id,
        fullName: userRecord.fullName,
      },
    });

    return sendRedirect(event, "/");
  },
  onError(event, error) {
    console.error("Google OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
