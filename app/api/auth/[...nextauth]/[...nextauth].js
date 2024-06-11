
export const options = {
  providers: [
    Providers.Supabase({
      supabaseClient: (req) => supabase,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('Sign in', { user, account, profile, email, credentials });
    },
  },
};
      