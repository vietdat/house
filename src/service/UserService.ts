import { getRepository, Repository, InsertResult, TreeChildren } from "typeorm";
import { User } from "../entity/User";
import { sprintf } from "sprintf-js";
import * as typeData from "../libs/typeData";

export class UserService {
    private userRepository: Repository<User> = getRepository(User);

    async search(): Promise<User[]> {
        let instances: User[];

        try {
            instances = await this.userRepository.find();
        } catch (err) {
            throw err;
        }

        if (!instances || !instances.length) {
            return [];
        }

        return instances;
    }

    async findOne(query: Object): Promise<User>  {
        let user: User;

        try {
            user = await this.userRepository.findOne(query);
        } catch (err) {
            throw err;
        }

        if (!user) {
            throw new Error("User not found!");
        }

        return user;
    }

    create(body: Object): Promise<InsertResult> {
        let instance: User;

        try {
            instance = this.userRepository.create(body);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw new Error("Cannot create user!");
        }

        return this.userRepository.insert(instance);
    }

    async update(user: User): Promise<InsertResult> {
        let instance: User;

        try {
            instance = await this.userRepository.save(user);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw new Error("Cannot create user!");
        }

        return this.userRepository.insert(instance);
    }

    async findOrCreateFacebook(facebook): Promise<User> {
        let user: User;
        console.log(facebook);
        let query = sprintf('facebook->id>%s',facebook.id);
        console.log(query);
        try {
            user = await this.userRepository.query(query);
        } catch (err) {
            throw err;
        }

        if(!user) {
            let body = {
                facebook: facebook,
                email: facebook.email,
                givenName: facebook.displayName,
                avatar: sprintf('https://graph.facebook.com/%s/picture?type=large', facebook.id)
            }
            try {
                user = await this.userRepository.create(body);
            } catch (err) {
                throw err;
            }
    
            if (!user) {
                throw "Cannot create user!";
            }

            await this.userRepository.insert(user);
        } else {
            throw "Cannot create sadfsdf!";
        }

        return user;
    }

    async findOrCreateGoogle(google: typeData.IGoogle) {
        console.log(google);
        return google;
    }

    async findOrCreateTwitter(twitter: typeData.ITwitter) {
        console.log(twitter);
        return twitter;
    }

    remove(userId) {

        try {
            this.userRepository.remove(userId);
        } catch (err) {
            throw err;
        }

        return;
    }
}