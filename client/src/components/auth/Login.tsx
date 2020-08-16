import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth.actions";

import { LoginUserDto } from "../../actions/auth.actions";
import { AppState } from "../../reducers";
import { useHistory } from "react-router-dom";

type LoginProps = {
  loginUser: (data: LoginUserDto) => void;
  isAuthenticated: boolean;
};

const Login = ({ loginUser, isAuthenticated }: LoginProps) => {
  const [formData, setFormData] = useState<LoginUserDto>({
    username: "",
    password: "",
  });

  const history = useHistory();

  useEffect(() => {
    // Redirect user when authentication is complete
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  const { password, username } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginUser(formData);
  };

  return (
    <>
      <div className="container">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="username"
                value={username}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                type="password"
                className="input"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
            <div className="control">
              <button className="button is-link is-light">Cancel</button>
            </div>
            {console.log(process.env.BASE_API_URL)}
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(Login);
