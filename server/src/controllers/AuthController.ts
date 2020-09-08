import { Request, Response } from "express";
import User from "../models/User";
import validateLoginInput from "../validator/login";
import validateRegisterInput from "../validator/register";
import { LoginData, RegisterData } from "../models/Auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { opts } from "../config/passport";

class AuthController {
  public async login(req: Request, res: Response): Promise<Response> {
    const data = req.body as LoginData;
    const { isValid, errors } = validateLoginInput(data);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.status(403).json({
        message: "Email inválido",
      });
    }
    return res.json(user);
  }
  public async register(req: Request, res: Response): Promise<Response> {
    const data = req.body as RegisterData;
    const { isValid, errors } = validateRegisterInput(data);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    let user = await User.findOne({ email: data.email, username: data.name });
    if (user) {
      return res.status(403).json({
        message: "O email já está sendo utilizado",
      });
    }
    user = await User.create({
      username: data.name,
      email: data.email,
      password: data.password,
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        if (err) res.status(500).json({ err });
        try {
          user.password = hash;
          user = await user.save();
          res.json(user);
        } catch (error) {
          res.status(500).json({ err });
        }
      });
    });
  }

  public async index(req: Request, res: Response): Promise<void> {
    switch (req.params.provider) {
      case "github":
        this._githubAuth(req, res);
        break;
      case "facebook":
        this._facebookAuth(req, res);
        break;
      case "google":
        this._googleAuth(req, res);
        break;
      case "twitter":
        this._twitterAuth(req, res);
        break;
      case "instagram":
        this._instagramAuth(req, res);
        break;
      case "bitbucket":
        this._bitbucketAuth(req, res);
        break;
      case "linkedin":
        this._linkedinAuth(req, res);
        break;
      case "live":
        this._liveAuth(req, res);
        break;
      case "login":
        this.loginAuth(req, res);
        break;
      case "register":
        this._registerAuth(req, res);
        break;
      case "logout":
        this._logoutAuth(req, res);
        break;
    }
    return;
  }
  private _githubAuth(req: Request, res: Response): void {
    console.log(req, res);
    // ...
  }
  private _facebookAuth(req: Request, res: Response): void {
    console.log(req, res);
    // ...
  }
  private _googleAuth(req: Request, res: Response): void {
    console.log(req, res);
    // ...
  }
  private _twitterAuth(req: Request, res: Response): void {
    console.log(req, res);
    // ...
  }
  private _instagramAuth(req: Request, res: Response): void {
    console.log(req, res);
    // ...
  }
  private _bitbucketAuth(req: Request, res: Response): void {
    console.log(req, res);
    // ...
  }
  private _linkedinAuth(req: Request, res: Response): void {
    console.log(req, res);
    // ...
  }
  private _liveAuth(req: Request, res: Response): void {
    console.log(req, res);
    // ...
  }
  async loginAuth(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as LoginData;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Email não encontrado",
      });
    }
    console.log(email, password, user);
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(403).json({ message: "Senha incorreta" });
      }
      const payload = {
        id: user.id,
        name: user.username,
      };
      jwt.sign(
        payload,
        opts.secretOrKey,
        { expiresIn: 31556926 /*1year*/ },
        (err, token) => {
          if (err) return res.status(500).json({ err });
          return res.json({
            success: true,
            token: "Bearer " + token,
            user,
          });
        }
      );
    });
  }
  private _registerAuth(req: Request, res: Response): void {
    console.log(req, res);
    // ...
  }
  private _logoutAuth(req: Request, res: Response): void {
    console.log(req, res);
    // ...
  }
}

export default new AuthController();
