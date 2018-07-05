import { getRepository, Repository } from "typeorm";
import { User } from "../entity/User";
export class UserService {
    private userRepository: Repository<User> = getRepository(User);
    async search() {
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

    async findOne(query: Object) {
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

    create(body: Object) {
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

    async update(user: User) {
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

    remove(userId) {

        try {
            this.userRepository.remove(userId);
        } catch (err) {
            throw err;
        }

        return;
    }
}