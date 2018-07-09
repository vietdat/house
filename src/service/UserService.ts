import { getRepository, Repository, InsertResult, TreeChildren } from "typeorm";
import { User } from "../entity/User";
import { sprintf } from "sprintf-js";
import * as typeData from "../libs/typeData";

export class UserService {
    private userRepository: Repository<User> = getRepository(User);

    public async search(): Promise<User[]> {
        let instances: User[];

        try {
            instances = await this.userRepository.find();
        } catch (err) {
            throw err;
        }

        if (!instances || !instances.length) {
            return [];
        }
        throw Error("err");
        // return instances;
    }

    public async findOne(query: object): Promise<User> {
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

    public async create(body: object): Promise<InsertResult> {
        let instance: User;

        try {
            instance = await this.userRepository.create(body);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw new Error("Cannot create user!");
        }
        return this.userRepository.insert(instance);
    }

    public async update(user: User): Promise<InsertResult> {
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

    public async findOrCreateFacebook(facebook): Promise<User> {
        let user: User;
        const query = sprintf("SELECT * FROM public.\"user\" WHERE facebook->>'id'='%s'", facebook.id);
        try {
            user = await this.userRepository.query(query);
        } catch (err) {
            throw err;
        }

        if (!user) {
            const body = {
                facebook: {
                    id: facebook.id,
                    email: facebook.email
                },
                email: facebook.email,
                givenName: facebook.name.givenName,
                familyName: facebook.name.familyName,
                password: "fasjkdfbgu2w121"
            };
            try {
                user = await this.userRepository.create(body);
            } catch (err) {
                throw err;
            }

            await this.userRepository.insert(user);
        }
        return user[0];
    }

    public async findOrCreateGoogle(google) {
        let user: User;
        const query = sprintf("SELECT * FROM public.\"user\" WHERE facebook->>'id'='%s'", google.id);
        try {
            user = await this.userRepository.query(query);
        } catch (err) {
            throw err;
        }

        if (!user) {
            const body = {
                facebook: {
                    id: google.id,
                    email: google.email
                },
                email: google.email,
                givenName: google.name.givenName,
                familyName: google.name.familyName,
                password: "fasjkdfbgu2w121"
            };
            try {
                user = await this.userRepository.create(body);
            } catch (err) {
                throw err;
            }

            await this.userRepository.insert(user);
        }
        return user;
    }

    public async findOrCreateTwitter(twitter) {
        let user: User;
        const query = sprintf("SELECT * FROM public.\"user\" WHERE facebook->>'id'='%s'", twitter.id);
        try {
            user = await this.userRepository.query(query);
        } catch (err) {
            throw err;
        }

        if (!user) {
            const body = {
                facebook: {
                    id: twitter.id,
                    email: twitter.email
                },
                email: twitter.email,
                givenName: twitter.name.givenName,
                familyName: twitter.name.familyName,
                password: "fasjkdfbgu2w121"
            };
            try {
                user = await this.userRepository.create(body);
            } catch (err) {
                throw err;
            }

            await this.userRepository.insert(user);
        }
        return user;
    }

    public remove(userId) {

        try {
            this.userRepository.delete({ id: userId });
        } catch (err) {
            throw err;
        }

        return;
    }

    public async sendOtp(user: User): Promise<InsertResult> {
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
}