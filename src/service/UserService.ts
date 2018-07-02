import { getRepository } from "typeorm";
import { User } from "../entity/User";

export class UserService {
    private userRepository = getRepository(User);

    async findAll() {
        return this.userRepository.find();
    }

    async findOne(query) {
        return this.userRepository.findOne(query);
    }

    async create(body) {
        let instance = await this.userRepository.create(body);
        return this.userRepository.insert(instance);
    }

    async remove(userId) {
        return this.userRepository.remove(userId);
    }
}