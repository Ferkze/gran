import { IUser } from "./models/UserModel";
import { User } from "../../models/entities/User";

export function deserializeUser(user: IUser): User {
	return {
		id: user._id as string,
		username: user.username,
		email: user.email,
		password: user.password,
		firstName: user.firstName,
		lastName: user.lastName,
		accounts: user.accounts || [],
		budgets: user.budgets || [],
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	}
}