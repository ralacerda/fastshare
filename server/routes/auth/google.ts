import { eq } from "drizzle-orm";
import { users } from "~~/db/schema";

export default oauthGoogleEventHandler({
  async onSuccess(event, { user }) {
    let userRecord = await db.query.users.findFirst({
      where: eq(users.sub, user.sub),
      columns: { id: true },
    });

    if (!userRecord) {
      [userRecord] = await db
        .insert(users)
        .values({
          sub: user.sub,
          fullName: user.name,
          email: user.email,
        })
        .returning({ id: users.id });
    }

    await setUserSession(event, {
      user: {
        sub: user.sub,
        id: userRecord.id,
      },
    });

    return sendRedirect(event, "/");
  },
  onError(event, error) {
    console.error("Google OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
