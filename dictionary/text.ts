export const Text = {
  app: {
    main: {
      navigation: {
        about: "About Us",
        latest: "Latest",
        contact: "Contact",
        join_us: "Join Us",
        sign_out: "Sign Out",
        favourites: "Favourites",
        account: "Account"
      },
      components: {
        hero: {
          main_heading: "Welcome at your movie center. Welcome at Vimea.",
          sub_heading:
            "We provide best quality movies,  series and TV shows. Watch anytime you want.",
          upcoming: "Upcoming",
        },
        latest: {
          add_favourite: "Add to Favourites",
          remove_favourite: "Remove from Favourites"
        },
      },
      forms: {
        labels: {
          sign_in: "Sign In",
          sign_up: "Sign Up",
          create_account: "Create an account",
          first_name: "First name",
          last_name: "Last name",
          remind_password: "Remind Password",
          email: "Enter email",
          password: "Enter password",
          remind: "Remind",
          accept_policy: "You have to accept our",
          privacy_policy: "Privacy Policy",
          create: "Create",
          back_to_sign_in: "Back to sign in",
          change_password:"Change Password",
          current_password: "Current password",
          new_password: "New password",
          confirm_new_password: "Confirm new password",
          change: "Change"
        },
        validationErrors: {
          required: {
            email: "Please provide a email",
            password: "Please provide a password",
            first_name: "Please provide a first name",
            last_name: "Please provide a last name",
            avatar: "Please provide an avatar",
            policy: "Please accept our privacy policy",
            current_password: "Please provide current password",
            new_password: "Please provide new password",
            confirm_new_password: "Please confirm new password"
          },
          pattern: {
            email: "Please provide a correct email",
            password: "Please provide a correct password",
          },
          errors: {
            email: "Invalid email adress",
            confirm_new_password: "Provided new passwords are not the same. Confirm with the correct password"
          },
        },
      },
      common: {
        havent_logged_in: "You haven't logged in",
        already_added: "Already added",
        fetchingLatestMoviesFailed: "Getting latest upcoming movies failed. Please refresh the page or try again later"
      },
    },
  },
};
