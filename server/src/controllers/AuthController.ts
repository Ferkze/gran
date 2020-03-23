import { Request, Response } from 'express'
import User from '../models/User'

interface LoginData {
  email ?: string
  password ?: string
}

interface RegisterData {
  username ?: string
  email ?: string
  password ?: string
  firstName ?: string
  lastName ?: string
  accounts?: Account[]
  createdAt?: string
  updatedAt?: string
}

class AuthController {
  public async login(req: Request, res: Response): Promise<Response> {
    const data = req.body as LoginData
    const user = await User.findOne({ email: data.email})
    if (!user) {
      return res.status(403).json({
        message: 'Email inválido'
      })
    }
    return res.json(user)
  }
  public async register(req: Request, res: Response): Promise<Response> {
    const data = req.body as RegisterData
    let user = await User.findOne({ email: data.email, username: data.username })
    if (user) {
      return res.status(403).json({
        message: 'O email já está sendo utilizado'
      })
    }
    user = await User.create(data)
    return res.json(user)
  }

  public async index(req: Request, res: Response): void {
    console.log(req, res)
    switch(req.params.provider) {
    case 'github':
      this._githubAuth(req, res)
      break
    case 'facebook':
      this._facebookAuth(req, res)
      break
    case 'google':
      this._googleAuth(req, res)
      break
    case 'twitter':
      this._twitterAuth(req, res)
      break
    case 'instagram':
      this._instagramAuth(req, res)
      break
    case 'bitbucket':
      this._bitbucketAuth(req, res)
      break
    case 'linkedin':
      this._linkedinAuth(req, res)
      break
    case 'live':
      this._liveAuth(req, res)
      break
    case 'login':
      this._loginAuth(req, res)
      break
    case 'register':
      this._registerAuth(req, res)
      break
    case 'logout':
      this._logoutAuth(req, res)
      break
    }
  }
  private _githubAuth(req: Request, res: Response): void {
    console.log(req, res)
    // ...
  }
  private _facebookAuth(req: Request, res: Response): void {
    console.log(req, res)
    // ...
  }
  private _googleAuth(req: Request, res: Response): void {
    console.log(req, res)
    // ...
  }
  private _twitterAuth(req: Request, res: Response): void {
    console.log(req, res)
    // ...
  }
  private _instagramAuth(req: Request, res: Response): void {
    console.log(req, res)
    // ...
  }
  private _bitbucketAuth(req: Request, res: Response): void {
    console.log(req, res)
    // ...
  }
  private _linkedinAuth(req: Request, res: Response): void {
    console.log(req, res)
    // ...
  }
  private _liveAuth(req: Request, res: Response): void {
    console.log(req, res)
    // ...
  }
  private _loginAuth(req: Request, res: Response): void {
    console.log(req, res)
    // ...
  }
  private _registerAuth(req: Request, res: Response): void {
    console.log(req, res)
    // ...
  }
  private _logoutAuth(req: Request, res: Response): void {
    console.log(req, res)
    // ...
  }
}

export default new AuthController()