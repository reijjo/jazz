const Homepage = () => {
  return (
    <section id="homepage">
      <h1>HOMEPAGE</h1>
      <div className="register">
        <h2>Register</h2>
        <form>
          <div className="register-inputs">
            {/* Username input */}
            <div className="my-input">
              <label htmlFor="reg-input-username">Username</label>
              <input type="text" id="reg-input-username" />
            </div>

            {/* Password input */}
            <div className="my-input">
              <label htmlFor="reg-input-passwd">Password</label>
              <input type="password" id="reg-input-passwd" />
            </div>
          </div>

          <div className="my-input-button">
            <button>Register</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Homepage;
